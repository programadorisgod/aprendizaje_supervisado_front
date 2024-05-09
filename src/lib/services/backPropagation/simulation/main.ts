import fetchData from '$lib/utils/fetchData'
import { sin } from '../activationFunctions/seno'
import { sigmoid } from '../activationFunctions/sigmoid'
import { tanh } from '../activationFunctions/tanh'
import type { layerManagement, networkLayer } from '../interface'

export default async function simulation(
	weights: number[][][],
	thresholds: number[][],
	layers: networkLayer[]
): Promise<Array<Array<number>>> {
	let dataBase: [number[], number[]][] = []

	dataBase = await fetchData()

	const w: number[][][] = weights
	const u: number[][] = thresholds
	const numPatterns = dataBase.length
	const numEntries: number = dataBase[0][0].length

	const aux: layerManagement = {
		indexes: [numEntries, ...layers.map((layer) => layer.neurons)],
		current: 0
	}

	const yr: number[][] = []

	//por cada patron
	for (let p = 0; p < numPatterns; p++) {
		const h: number[][] = [dataBase[p][0], ...layers.map((v) => new Array(v.neurons).fill(0))]

		for (let c = 0; c < layers.length; c++) {
			for (let i = 0; i < aux.indexes[aux.current + 1]; i++) {
				for (let j = 0; j < aux.indexes[aux.current]; j++) {
					h[c + 1][i] += h[c][j] * w[c][i][j]
				}

				// Restar el umbral
				h[c + 1][i] -= u[c][i]

				// Funciones de activacion
				switch (layers[c].activationFunction) {
					case 'TH':
						// h sub i es igual a fa(suma - u)
						h[c + 1][i] = tanh(h[c + 1][i])

						break
					case 'SG':
						h[c + 1][i] = sigmoid(h[c + 1][i])

						break
					case 'SENO':
						h[c + 1][i] = sin(h[c + 1][i])

						break
				}

				if (c == layers.length - 1) {
					h[c + 1][i] = h[c + 1][i] < 0.5 ? 0 : 1
				}
			}
			aux.current++
		}
		console.log(h)

		yr.push(h.at(-1)!)
		aux.current = 0
	}
	console.log(weights, thresholds, layers)

	return yr
}
