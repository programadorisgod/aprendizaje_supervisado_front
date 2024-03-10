<script lang="ts">
	import { onMount } from 'svelte'
	import fetchData from '$lib/utils/fetchData'
	import StepLoading from './StepLoading.svelte'
	import { select, type Selection } from 'd3'

	let svg: Selection<SVGGElement, unknown, HTMLElement, any>
	let input_params: Array<Array<number>>

	let isVisible: boolean = false

	onMount(async () => {
		input_params = await fetchData('input_params')

		drawNeuralNetwork()
        
		isVisible = !!input_params

        if (isVisible) {
            select('#neural-network').classed('hidden', false)
        }

	})

	function drawNeuralNetwork() {
		const width = 300
		const height = 300

		const layers = [
			{ name: 'Input', neurons: input_params[0][0] },
			{ name: 'Neuron', neurons: input_params[0][1] },
			{ name: 'Output', neurons: input_params[0][1] }
		]

		const margin = { top: 20, right: 20, bottom: 20, left: 20 }

		const innerWidth = width - margin.left - margin.right
		const innerHeight = height - margin.top - margin.bottom

		const layerWidth = innerWidth / layers.length

		svg = select('#neural-network')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		layers.forEach((layer, i) => {
			const x = i * layerWidth + layerWidth / 2
			const ySpacing = innerHeight / (layer.neurons + 1)
			let y: number = 0
			svg
				.append('text')
				.attr('x', x)
				.attr('y', 10)
				.attr('fill', 'white')
				.attr('text-anchor', 'middle')
				.text(layer.name)

			for (let j = 0; j < layer.neurons; j++) {
				const y = (j + 1) * ySpacing
				svg
					.append('circle')
					.attr('cx', x)
					.attr('cy', y)
					.attr('r', 10)
					.style('fill', 'white')
					.style('stroke', 'black')

				// Dibujar conexiones desde cada neurona de la capa actual a todas las neuronas de la capa siguiente
				if (i !== 1 && i < layers.length - 1) {
					const nextLayer = layers[i + 1]
					const nextX = (i + 1) * layerWidth + layerWidth / 2
					const nextYSpacing = innerHeight / (nextLayer.neurons + 1)
					const nextY = (j + 1) * nextYSpacing
					for (let k = 0; k < nextLayer.neurons; k++) {
						const nextY = (k + 1) * nextYSpacing

						svg
							.append('line')
							.attr('x1', x)
							.attr('y1', y)
							.attr('x2', nextX)
							.attr('y2', nextY)
							.attr('stroke', 'white')
							.attr('marker-end', 'url(#arrow)')
					}
				}
				// Dibujar conexiones desde cada neurona de la capa oculta a la neurona correspondiente de la capa de salida
				if (i === 1 && i < layers.length - 1) {
					const nextLayer = layers[i + 1]
					const nextX = (i + 1) * layerWidth + layerWidth / 2
					const nextYSpacing = innerHeight / (nextLayer.neurons + 1)
					const nextY = (j + 1) * nextYSpacing // La neurona actual de la capa oculta se conecta con la neurona correspondiente de la capa de salida

					svg
						.append('line')
						.attr('x1', x)
						.attr('y1', y)
						.attr('x2', nextX)
						.attr('y2', nextY)
						.attr('stroke', 'white')
						.attr('marker-end', 'url(#arrow)')
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

{#if input_params}
	{#each input_params as param}
		<ul class="text-gray-50 text-3xl">
			<li>Entradas: {param[0]}</li>
			<li>Salidas: {param[1]}</li>
			<li>Patrones: {param[2]}</li>
		</ul>
	{/each}
{:else}
	<StepLoading data="Obteniendo los parametros de entrada..." />
{/if}

<svg id="neural-network" class="border-2 mt-6 hidden"></svg>
