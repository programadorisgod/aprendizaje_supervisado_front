export function sin(x: number): number {
	return Math.sin((x * Math.PI) / 180)
}

export function derivativeSin(x: number): number {
	return Math.cos((x * Math.PI) / 180)
}
