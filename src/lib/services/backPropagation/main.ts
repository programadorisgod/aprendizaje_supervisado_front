import { setAppStatusUnknowError } from '$lib/stores/stores'
import fetchData from '$lib/utils/fetchData'
import type { networkLayer, training } from './interface'
import trainingFunction from './training/training'

export default async function backPropagationMain(
	iterations: number,
	learningRat: number,
	maxError: number,
	weights: number[][][],
	thresholds: number[][],
	layers: networkLayer[],
	bpType: number
): Promise<training> {
	let dataBase: [number[], number[]][] = []

	//console.log(thresholds, weights)

	try {
		dataBase = await fetchData()
	} catch (error) {
		setAppStatusUnknowError()
		return { weights: [[[]]], thresholds: [[]], iterationError: [], iterations: 0 }
	}

	const numEntries: number = dataBase[0][0].length // entradas
	const numOutputs: number = dataBase[0][1].length // salidas
	const numPatterns: number = dataBase.length // patrones

	// return { iterations: 0, iterationError: [], weights: [[[]]], thresholds: [[]] }

	// llamada a funcion de entrenamiento
	return await trainingFunction({
		iterations,
		learningRat,
		maxError,
		dataBase,
		numEntries,
		numOutputs,
		numPatterns,
		weights,
		thresholds,
		layers,
		bpType
	})
}
