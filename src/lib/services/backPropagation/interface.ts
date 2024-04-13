export interface network {
	iterations: number
	learningRat: number
	maxError: number
	dataBase: [number[], number[]][]
	numEntries: number
	numOutputs: number
	numPatterns: number
	weights: number[][][]
	thresholds: number[][]
	layers: networkLayer[]
}

export interface networkLayer {
	neurons: number
	activationFunction: String
}

export interface training {
	iterations: number
	weights: number[][]
	thresholds: number[]
	iterationError: number[]
}

export interface layerManagement {
	indexes: number[]
	current: number
}
