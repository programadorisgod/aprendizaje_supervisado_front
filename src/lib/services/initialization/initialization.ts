import type { neurone, training } from '../interface'

export default function initialization(neuron: neurone): training {
	let iterationError: number[] = [1] // Error iteracion (sin el primer elemento)
	let iteration: number = 1 // iteraciones (inicia en 1 en vez de 0 porque hay uno de mas en iterationError)
	let w: number[][] = neuron.weights // pesos
	let u: number[] = neuron.thresholds // umbrales

	while (neuron.maxError < iterationError.at(-1)! && iteration <= neuron.iterations) {
		// mayor o igual al error?
		let ep: number[] = [] // Error patron

		// Por cada patron
		for (let p = 0; p < neuron.numPatterns; p++) {
			let s: number[] = [] // salidas de la red
			let yr: number[] = [] // Salidas reales
			let el: number[] = [] // Error lienal
			// Por cada salida y entrada
			for (let i = 0; i <= neuron.numOutputs; i++) {
				// Salidas de la red
				s.push(0)
				for (let j = 0; j < neuron.numEntries; j++) {
					s[i] += neuron.dataBase[p][0][j] * w[j][i]
				}

				// Salidas - Umbral
				s[i] = s[i] - u[i]

				// Salidas reales

				yr[i] = s[i] >= 0 ? 1 : 0

				// Error lineal
				el[i] = neuron.dataBase[p][1][i] - yr[i]
			}

			// Error producido en el patron
			ep.push(0)
			for (let i = 0; i < neuron.numOutputs; i++) {
				ep[p] += el[i]
			}
			ep[p] = Math.abs(ep[p]) / neuron.numOutputs

			// Aplicar algoritmo de entrenamiento
			// ...
			for (let i = 0; i < neuron.numOutputs; i++) {
				// Nueva matriz de pesos
				for (let j = 0; j < neuron.numEntries; j++) {
					w[j][i] = w[j][i] + neuron.learningRat * el[i] * neuron.dataBase[p][0][j] // logica matriz pesos w[j][i]?
				}

				// Nuevo vector de umbrales
				u[i] = u[i] + neuron.learningRat * el[i] * 1
			}
		}
		console.log(w)

		// Error de iteracion
		iterationError.push(0) // nuevo error

		for (let i = 0; i < ep.length; i++) {
			iterationError[iteration] += ep[i]
		}
		iterationError[iteration] /= neuron.numPatterns

		console.log(iterationError)

		iteration++
	}

	return {
		iterations: iteration - 1,
		iterationError: iterationError.slice(1, iteration),
		weights: w,
		thresholds: u
	}
}
