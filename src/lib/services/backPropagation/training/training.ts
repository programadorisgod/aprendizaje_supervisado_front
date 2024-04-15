import { derivativeSin, sin } from '../activationFunctions/seno'
import { derivativeSigmoid, sigmoid } from '../activationFunctions/sigmoid'
import { derivativeTanh, tanh } from '../activationFunctions/tanh'
import type { layerManagement, network, training } from './../interface'

export default function trainingFunction(net: network): training {
	const iterationError: number[] = [1] // Error iteracion (sin el primer elemento)
	let iteration: number = 1 // iteraciones (inicia en 1 en vez de 0 porque hay uno de mas en iterationError)
	const w: number[][][] = net.weights // pesos
	const u: number[][] = net.thresholds // umbrales
	const aux: layerManagement = {
		indexes: [net.numEntries, ...net.layers.map((layer) => layer.neurons)],
		current: 0
	}

	while (net.maxError < iterationError.at(-1)! && iteration <= net.iterations) {
		// Error por patron
		const ep: number[] = new Array(net.numPatterns).fill(0)

		// Por cada patron
		for (let p = 0; p < net.numPatterns; p++) {
			// Errores
			const e: number[][] = net.layers.map((v) => new Array(v.neurons).fill(0))
			// Salidas y salidas de las capas ocultas
			const h: number[][] = e
			h.unshift(net.dataBase[p][0])
			// Derivadas (todas, asi que capa-salida = 1)
			const der: number[][] = e

			// Por cada capa
			for (let c = 0; c < net.layers.length; c++) {
				// por cada indice exterior
				for (let i = 0; i < aux.indexes[aux.current + 1]; i++) {
					// por cada indice interior
					for (let j = 0; j < aux.indexes[aux.current]; j++) {
						h[c + 1][i] += h[c][i] * w[c][i][j]
					}

					// Restar el umbral
					h[c + 1][i] -= u[c][i]
					// funcion de activacion
					let fa = 0
					// funcion de activacion derivada
					let derFa = 1

					// Funciones de activacion
					switch (net.layers[c].activationFunction) {
						case 'TH':
							fa = tanh(h[c + 1][i])
							derFa = derivativeTanh(h[c + 1][i])
							break
						case 'SG':
							fa = sigmoid(h[c + 1][i])
							derFa = derivativeSigmoid(h[c + 1][i])
							break
						case 'SENO':
							fa = sin(h[c + 1][i])
							derFa = derivativeSin(h[c + 1][i])
							break

						default:
							// Funcion lineal
							fa = 0
							break
					}

					// h sub i es igual a fa(suma - u)
					h[c + 1][i] = fa

					// Derivada y por si es la capa de salida
					der[c][i] = c != net.layers.length - 1 ? derFa : 1
				}
				aux.current++
			}
			// Error lineal capa salida
			for (let k = 0; k < net.numOutputs; k++) {
				e[e.length - 1][k] = net.dataBase[p][1][k] - h[h.length - 1][k]
			}

			// Por cada capa desde la ultima capa oculta (sin la de salida)
			for (let c = net.layers.length - 2; c >= 0; c--) {
				// Por cada indice exterior
				for (let i = 0; i < aux.indexes[aux.current - 1]; i++) {
					// Por cada indice interior
					for (let j = 0; j < aux.indexes[aux.current]; j++) {
						e[c][i] += e[c + 1][j] * w[c][j][i]
					}
				}
				aux.current--
			}

			// Error por patron
			for (let i = 0; i < net.numOutputs; i++) {
				ep[p] += e[net.layers.length - 1][i]
			}
			ep[p] = ep[p] / net.numOutputs

			// Actualizar pesos/umbrales
			// Por cada capa
			for (let c = 0; c < net.layers.length; c++) {
				// Por cada indice exterior
				for (let i = 0; i < aux.indexes[aux.current + 1]; i++) {
					// Por cada indice interior
					for (let j = 0; j < aux.indexes[aux.current]; j++) {
						w[c][j][i] = w[c][j][i] + 2 * net.learningRat * e[c][i] * der[c][i] * h[c][j]
					}
					u[c][i] = u[c][i] + 2 * net.learningRat * e[c][i] * der[c][i] * 1
				}
				aux.current++
			}
			console.log(h, e, der)
		}

		// Error por iteracion
		iterationError.push(0)

		for (let i = 0; i < ep.length; i++) {
			iterationError[iteration] += ep[i]
		}
		iterationError[iteration] /= net.numPatterns

		// Siguiente ciclo
		aux.current = 0
		iteration++
	}

	console.log(iterationError, w, u)

	return {
		iterations: iteration - 1,
		iterationError: iterationError.slice(1, iteration),
		weights: w,
		thresholds: u
	}
}
