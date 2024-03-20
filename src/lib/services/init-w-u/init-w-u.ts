import type { init } from '../interface'

export default function initWU(numEntries: number, numOutputs: number): init {
	const weight = Array.from({ length: numEntries }, () =>
		Array.from({ length: numOutputs }, () => Number((Math.random() * 2 - 1).toFixed(2)))
	)
	const thresholds = Array.from({ length: numOutputs }, () =>
		Number((Math.random() * 2 - 1).toFixed(2))
	)

	return { weight: weight, thresholds: thresholds }
}
