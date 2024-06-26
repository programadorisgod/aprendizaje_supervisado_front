/* import customFetch from '$lib/utils/fecthBackPropagation' */
import { derivativeSin, sin } from '../activationFunctions/seno'
import { derivativeSigmoid, sigmoid } from '../activationFunctions/sigmoid'
import { derivativeTanh, tanh } from '../activationFunctions/tanh'
import initWU from '../init-w-u/init-w-u'
import type { init, layerManagement, network, training } from './../interface'

export default async function trainingFunction(net: network): Promise<training> {
	const iterationError: number[] = [1] // Error iteracion (sin el primer elemento)
	let iteration: number = 1 // iteraciones (inicia en 1 en vez de 0 porque hay uno de mas en iterationError)
	let w: number[][][] = net.weights // pesos
	let u: number[][] = net.thresholds // umbrales
	const aux: layerManagement = {
		indexes: [net.numEntries, ...net.layers.map((layer) => layer.neurons)],
		current: 0
	}

	console.log(net)

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
						h[c + 1][i] += parseFloat((h[c][j] * w[c][i][j]).toFixed(5))
					}

					// Restar el umbral
					h[c + 1][i] -= u[c][i]

					// Funciones de activacion
					switch (net.layers[c].activationFunction) {
						case 'TH':
							// h sub i es igual a fa(suma - u)
							h[c + 1][i] = parseFloat(tanh(h[c + 1][i]).toFixed(5))
							// Derivada y por si es la capa de salida
							der[c][i] =
								c != net.layers.length - 1 ? parseFloat(derivativeTanh(h[c + 1][i]).toFixed(5)) : 1
							break
						case 'SG':
							h[c + 1][i] = parseFloat(sigmoid(h[c + 1][i]).toFixed(5))
							der[c][i] =
								c != net.layers.length - 1
									? parseFloat(derivativeSigmoid(h[c + 1][i]).toFixed(5))
									: 1
							break
						case 'SENO':
							h[c + 1][i] = parseFloat(sin(h[c + 1][i]).toFixed(5))
							der[c][i] =
								c != net.layers.length - 1 ? parseFloat(derivativeSin(h[c + 1][i]).toFixed(5)) : 1
							break
						default:
							der[c][i] = 1
							break
					}
				}
				aux.current++
			}
			aux.current = aux.indexes.length - 1

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
						e[c][i] += parseFloat((e[c + 1][j] * w[c + 1][j][i]).toFixed(5))
					}
				}
				aux.current--
			}

			// Error por patron
			for (let i = 0; i < net.numOutputs; i++) {
				ep[p] += e[net.layers.length - 1][i]
			}
			ep[p] = Math.abs(ep[p]) / net.numOutputs

			// Actualizar pesos/umbrales
			aux.current = 0
			// Por cada capa
			for (let c = 0; c < net.layers.length; c++) {
				// Por cada indice exterior
				for (let i = 0; i < aux.indexes[aux.current + 1]; i++) {
					// Por cada indice interior
					for (let j = 0; j < aux.indexes[aux.current]; j++) {
						w[c][i][j] = parseFloat(
							(
								w[c][i][j] +
								net.bpType * 2 * net.learningRat * e[c][i] * der[c][i] * h[c][j]
							).toFixed(5)
						)
					}
					u[c][i] = parseFloat(
						(u[c][i] + net.bpType * 2 * net.learningRat * e[c][i] * der[c][i] * 1).toFixed(5)
					)
				}
				aux.current++
			}
			console.log(e, h, w, u, der)
		}

		// Error por iteracion
		iterationError.push(0)

		for (let i = 0; i < ep.length; i++) {
			iterationError[iteration] += ep[i]
		}
		iterationError[iteration] = Math.abs(iterationError[iteration]) / net.numPatterns

		if (iteration % 3 && iterationError.at(-1) == iterationError[iteration - 1]) {
			const obj: init = initWU(aux.indexes)
			w = obj.weight
			u = obj.thresholds
		}

		// Siguiente ciclo
		iteration++
		aux.current = 0
	}
	console.log(iterationError)

	return {
		iterations: iteration - 1,
		iterationError: iterationError.slice(1, iteration),
		weights: w,
		thresholds: u
	}
}
