import { setAppStatusUnknowError } from '$lib/stores/stores'
import fetchData from '$lib/utils/fetchData'
import type { networkLayer } from './interface'
import trainingFunction from './training/training'

export default async function backPropagationMain(
	iterations: number,
	learningRat: number,
	maxError: number,
	weights: number[][][],
	thresholds: number[][],
	layers: networkLayer[]
) {
	let dataBase: [number[], number[]][] = []

	try {
		dataBase = await fetchData()
	} catch (error) {
		setAppStatusUnknowError()
		return { weights: [[[]]], thresholds: [[]], iterationError: [], iterations: 0 }
	}

	const numEntries: number = dataBase[0][0].length // entradas
	const numOutputs: number = dataBase[0][1].length // salidas
	const numPatterns: number = dataBase.length // patrones

	// llamada a funcion de entrenamiento
	return trainingFunction({
		iterations,
		learningRat,
		maxError,
		dataBase,
		numEntries,
		numOutputs,
		numPatterns,
		weights,
		thresholds,
		layers
	})
}
