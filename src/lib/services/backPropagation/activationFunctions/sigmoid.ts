export function sigmoid(x: number): number {
	return 1 / (1 + Math.exp(-x))
}

export function derivativeSigmoid(x: number): number {
	let sigmoidX = sigmoid(x)
	return sigmoidX * (1 - sigmoidX)
}
