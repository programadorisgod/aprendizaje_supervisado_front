import initialization from './initialization/initialization'
import type { training } from './interface'

export default function supervisedLearningMain(
	iterations: number,
	learningRat: number,
	maxError: number
): training {
	let dataBase: [number[], number[]][] = [
		[
			// entradas del patrón 1
			[0.1, 0.2],
			// salidas del patrón 1
			[0.3, 0.4]
		],
		[
			// entradas del patrón 2
			[0.5, 0.6],
			// salidas del patrón 2
			[0.7, 0.8]
		],
		[
			// entradas del patrón 3
			[0.9, 1.0],
			// salidas del patrón 3
			[1.1, 1.2]
		]
	]

	let numEntries: number = dataBase[0][0].length // entradas
	let numOutputs: number = dataBase[0][1].length // salidas
	let numPatterns: number = dataBase.length // patrones
	let weights: number[][] = Array.from({ length: numEntries }, () =>
		Array.from(
			{ length: numOutputs },
			() => Math.round((Math.random() * 2 - 1) * Math.pow(10, 6)) / Math.pow(10, 6)
		)
	)
	let thresholds: number[] = Array.from(
		{ length: numOutputs },
		() => Math.round((Math.random() * 2 - 1) * Math.pow(10, 6)) / Math.pow(10, 6)
	)

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
