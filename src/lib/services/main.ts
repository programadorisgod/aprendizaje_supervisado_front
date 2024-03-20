import fetchData from '$lib/utils/fetchData'
import initialization from './initialization/initialization'
import type { training } from './interface'

export default async function supervisedLearningMain(
	iterations: number,
	learningRat: number,
	maxError: number,
	weights: number[][],
	thresholds: number[]
): Promise<training> {
	let dataBase: [number[], number[]][] = []

	try {
		dataBase = await fetchData()
	} catch (error) {
		console.log(error)
	}

	let numEntries: number = dataBase[0][0].length // entradas
	let numOutputs: number = dataBase[0][1].length // salidas
	let numPatterns: number = dataBase.length // patrones

	// llamada a funcion de entrenamiento
	return initialization({
		iterations,
		learningRat,
		maxError,
		dataBase,
		numEntries,
		numOutputs,
		numPatterns,
		weights,
		thresholds
	})
}
