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
	activationFunction: string
}

export interface training {
	iterations: number
	iterationError: number[]
	weights: number[][][]
	thresholds: number[][]
}

export interface layerManagement {
	indexes: number[]
	current: number
}
