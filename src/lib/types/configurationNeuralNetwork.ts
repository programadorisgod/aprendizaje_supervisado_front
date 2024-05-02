export type typeConfiguration = {
	weights: number[][][]
	thresholds: number[][]
	bpType: number
	networkLayers: {
		neurons: number
		activationFunction: string
	}[]
}
