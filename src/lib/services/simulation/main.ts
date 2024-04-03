import fetchData from '$lib/utils/fetchData'

export default async function simulation(
	weights: number[][],
	thresholds: number[]
): Promise<Array<Array<number>>> {
	let dataBase: [number[], number[]][] = []

	dataBase = await fetchData()

	const w: number[][] = weights

	const u: number[] = thresholds

	const numPatterns = dataBase.length

	const numEntries: number = dataBase[0][0].length // entradas
	
	
	const numOutputs: number = dataBase[0][1].length

	const yr: number[][] = []
	//por cada patron
	for (let index = 0; index < numPatterns; index++) {
		const s: number[] = []
		yr.push([])

		for (let i = 0; i < numOutputs; i++) {
			s.push(0)

			for (let j = 0; j < numEntries; j++) {
				s[i] += dataBase[index][0][j] * w[j][i]
			}

			//Salidas - Umbral
			s[i] = s[i] - u[i]

			if (!yr[index]) {
				yr[index] = []
			}
			yr[index].push(0)

			//Salidas reales

			yr[index][i] = s[i] >= 0 ? 1 : 0
		}
	}

	return yr
}
