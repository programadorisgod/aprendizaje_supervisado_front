import type { init } from '../interface'

export default function initWU(numEntries: number, numOutputs: number): init {
	const weight = Array.from({ length: numEntries }, () =>
		Array.from({ length: numOutputs }, () => Math.random() * 2 - 1)
	)
	const thresholds = Array.from({ length: numOutputs }, () => Math.random() * 2 - 1)

	return { weight: weight, thresholds: thresholds }
}
