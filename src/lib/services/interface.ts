export interface neurone {
	iterations: number
	learningRat: number
	maxError: number
	dataBase: [number[], number[]][]
	numEntries: number
	numOutputs: number
	numPatterns: number
	weights: number[][]
	thresholds: number[]
}

export interface training {
	iterations: number
	weights: number[][]
	thresholds: number[]
	iterationError: number[]
}
