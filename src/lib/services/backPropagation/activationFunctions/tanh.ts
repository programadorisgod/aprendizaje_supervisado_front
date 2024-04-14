export function tanh(x: number): number {
	return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x))
}

export function derivativeTanh(x: number): number {
	let tanhX = tanh(x)
	return 1 - tanhX * tanhX
}
