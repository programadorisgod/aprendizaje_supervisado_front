import type { init } from '../interface'

export default function initWU(layers: number[]): init {
	const weight: number[][][] = layers.map((n) => new Array(n).fill(new Array())).slice(1)
	const thresholds: number[][] = layers.map((_) => new Array()).slice(1)

	let aux = 0
	for (let i = 0; i < layers.length - 1; i++) {
		for (let j = 0; j < layers[i + 1]; j++) {
			weight[i][j] = new Array(layers[i]).fill(Number((Math.random() * 2 - 1).toFixed(2)))
		}
	}
	for (let i = 0; i < layers.length - 1; i++) {
		thresholds[i] = new Array(layers[i + 1]).fill(Number((Math.random() * 2 - 1).toFixed(2)))
	}

	return { weight: weight, thresholds: thresholds }
}
