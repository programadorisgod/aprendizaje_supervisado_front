import fetchData from '$lib/utils/fetchData'
import type { layerManagement, networkLayer } from '../interface'

export default async function simulation(
	weights: number[][][],
	thresholds: number[][],
	layers: networkLayer[],
	bpType: number
): Promise<Array<Array<number>>> {
	let dataBase: [number[], number[]][] = []

	dataBase = await fetchData()

	const w: number[][][] = weights

	const u: number[][] = thresholds

	const numPatterns = dataBase.length

	const numEntries: number = dataBase[0][0].length

	const numOutputs: number = dataBase[0][1].length

	const aux: layerManagement = {
		indexes: [numEntries, ...layers.map((layer) => layer.neurons)],
		current: 0
	}

	const yr: number[][] = []

	//por cada patron
	for (let p = 0; p < numPatterns; p++) {
		const h: number[][] = [dataBase[p][0], ...layers.map((v) => new Array(v.neurons).fill(0))]

		for (let c = 0; c < layers.length; c++) {
			for (let i = 0; i < array.length; i++) {
				const element = array[i]
			}
		}
	}

	return
}
