import axios from 'axios'
import initialization from './initialization/initialization'
import type { training } from './interface'

interface response {
	data: [number[], number[]][]
}

export default async function supervisedLearningMain(
	iterations: number,
	learningRat: number,
	maxError: number
): Promise<training> {
	const { VITE_BASE_URL } = import.meta.env
	let dataBase: [number[], number[]][] = []
	/* await axios.get<response>(`${VITE_BASE_URL}`).then((response) => {
		dataBase = response.data;
		console.log(response.data)
	}) */

	let numEntries: number = dataBase[0][0].length // entradas
	let numOutputs: number = dataBase[0][1].length // salidas
	let numPatterns: number = dataBase.length // patrones
	let weights: number[][] = Array.from({ length: numEntries }, () =>
		Array.from({ length: numOutputs }, () => Math.random() * 2 - 1)
	)
	let thresholds: number[] = Array.from({ length: numOutputs }, () => Math.random() * 2 - 1)

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
