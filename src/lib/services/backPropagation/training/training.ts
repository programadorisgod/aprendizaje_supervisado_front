import type { layerManagement, network, training } from './../interface'
export default function trainingFunction(net: network) {
	const iterationError: number[] = [1] // Error iteracion (sin el primer elemento)
	let iteration: number = 1 // iteraciones (inicia en 1 en vez de 0 porque hay uno de mas en iterationError)
	const w: number[][][] = net.weights // pesos
	const u: number[][] = net.thresholds // umbrales
	const aux: layerManagement = {
		indexes: [net.numEntries, ...net.layers.map((layer) => layer.neurons)],
		current: 0
	}

	while (net.maxError < iterationError.at(-1)! && iteration <= net.iterations) {
		const ep: number[] = [] // Error por patron

		// Por cada patron
		for (let p = 0; p < net.numPatterns; p++) {
			const h: number[][] = [] // salidas de las capas ocultas
			const el: number[] = [] // errores lineales
			const enl: number[][] = [] // errores no lineales
		}
	}
}
