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
			const h: number[][] = [
				net.dataBase[p][0],
				...net.layers.map((v) => new Array(v.neurons).fill(0))
			]
			// Derivadas (todas, asi que capa-salida = 1)
			const der: number[][] = net.layers.map((v) => new Array(v.neurons).fill(0))

			// Por cada capa
			for (let c = 0; c < net.layers.length; c++) {
				// por cada indice exterior
				for (let i = 0; i < aux.indexes[aux.current + 1]; i++) {
					// por cada indice interior
					for (let j = 0; j < aux.indexes[aux.current]; j++) {
						h[c + 1][i] += h[c][j] * w[c][i][j]
					}

					// Restar el umbral
					h[c + 1][i] -= u[c][i]

					// Funciones de activacion
					switch (net.layers[c].activationFunction) {
						case 'TH':
							// h sub i es igual a fa(suma - u)
							h[c + 1][i] = tanh(h[c + 1][i])
							// Derivada y por si es la capa de salida
							der[c][i] = c != net.layers.length - 1 ? derivativeTanh(h[c + 1][i]) : 1
							break
						case 'SG':
							h[c + 1][i] = sigmoid(h[c + 1][i])
							der[c][i] = derivativeSigmoid(h[c + 1][i])
							break
						case 'SENO':
							h[c + 1][i] = sin(h[c + 1][i])
							der[c][i] = derivativeSin(h[c + 1][i])
							break

						default:
							// Funcion lineal
							h[c + 1][i] = 0
							der[c][i] = 0
							break
					}
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
						e[c][i] += e[c + 1][j] * w[c][i][j]
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
			aux.current = 0
			// Por cada capa
			for (let c = 0; c < net.layers.length; c++) {
				// Por cada indice exterior
				for (let i = 0; i < aux.indexes[aux.current + 1]; i++) {
					// Por cada indice interior
					for (let j = 0; j < aux.indexes[aux.current]; j++) {
						w[c][i][j] = w[c][i][j] + 2 * net.learningRat * e[c][i] * der[c][i] * h[c][j]
					}
					u[c][i] = u[c][i] + 2 * net.learningRat * e[c][i] * der[c][i] * 1
				}
				aux.current++
			}
		}

		// Error por iteracion
		iterationError.push(0)

		for (let i = 0; i < ep.length; i++) {
			iterationError[iteration] += ep[i]
		}
		iterationError[iteration] /= net.numPatterns

		// Siguiente ciclo
		iteration++
		aux.current = 0
	}

	return {
		iterations: iteration - 1,
		iterationError: iterationError.slice(1, iteration),
		weights: w,
		thresholds: u
	}
}
