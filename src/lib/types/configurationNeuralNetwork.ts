
export type typeConfiguration = {
	weights: number[][][]
	thresholds: number[][]
    networkLayers:{
        neurons: number;
        activationFunction: string;
    }[]
}