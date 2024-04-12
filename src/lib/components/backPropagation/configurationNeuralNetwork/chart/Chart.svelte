<script lang="ts">
	import { select, type Selection } from 'd3'
	import { onMount } from 'svelte'

	onMount(() => {
		drawNeuralNetwork()
	})

	let svg: Selection<SVGGElement, unknown, HTMLElement, any>

	export let inputs: number
	export let layers: Array<number>
	export let layerValues: Array<number>
	export let layerOutput: number

	function drawNeuralNetwork() {
		/* let layers: */
		const layersNeural: Array<{
			name: string
			neurons: number
		}> = []

		layersNeural.push({ name: 'Input', neurons: inputs })

		for (let index = 0; index < layers.length; index++) {
			layersNeural.push({ name: `Hidden ${index + 1}`, neurons: layerValues[index] })
		}

		layersNeural.push({ name: 'Output', neurons: layerOutput })

		const margin = { top: 20, right: 20, bottom: 20, left: 20 }
		const layerWidth = 100 // Ancho fijo para cada capa
		const nodeRadius = 10 // Radio de los nodos (círculos)
		const layerHeight =
			Math.max(...layersNeural.map((layer) => layer.neurons)) * (2 * nodeRadius + 10) + 40 // Altura de la capa más alta más margen

		const width = layersNeural.length * layerWidth + margin.left + margin.right
		const height = layerHeight + margin.top + margin.bottom

		const innerHeight = height - margin.top - margin.bottom

		svg = select('#neural-network')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		layersNeural.forEach((layer, i) => {
			const x = i * layerWidth + layerWidth / 2
			const ySpacing = innerHeight / (layer.neurons + 1)

			svg
				.append('text')
				.attr('x', x)
				.attr('y', 10)
				.attr('text-anchor', 'middle')
				.text(layer.name)
				.attr('fill', 'white')

			for (let j = 0; j < layer.neurons; j++) {
				const y = (j + 1) * ySpacing
				svg
					.append('circle')
					.attr('cx', x)
					.attr('cy', y)
					.attr('r', 10)
					.style('fill', 'white')
					.style('stroke', 'black')

				// Conectar con la capa siguiente
				if (i < layersNeural.length - 1) {
					const nextLayer = layersNeural[i + 1]
					const nextX = (i + 1) * layerWidth + layerWidth / 2
					const nextYSpacing = innerHeight / (nextLayer.neurons + 1)

					for (let k = 0; k < nextLayer.neurons; k++) {
						const nextY = (k + 1) * nextYSpacing
						svg
							.append('line')
							.attr('x1', x)
							.attr('y1', y)
							.attr('x2', nextX)
							.attr('y2', nextY)
							.style('stroke', 'white')
							.style('stroke-width', 1)
					}
				}
			}
		})

		// Añadir la definición de la flecha
		svg
			.append('defs')
			.append('marker')
			.attr('id', 'arrow')
			.attr('markerWidth', 10)
			.attr('markerHeight', 10)
			.attr('refX', 0)
			.attr('refY', 3)
			.attr('orient', 'auto')
			.append('path')
			.attr('d', 'M0,0 L0,6 L9,3 z')
			.attr('fill', 'white')
	}
</script>

<svg id="neural-network" class="border-2 mt-6"></svg>
