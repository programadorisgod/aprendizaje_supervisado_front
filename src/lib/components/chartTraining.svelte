<script lang="ts">
	import { setIsvisibleSimulation, trainingValues } from '$lib/stores/stores'
	import Chart from 'chart.js/auto'
	import { onMount } from 'svelte'

	let container: HTMLCanvasElement | null
	let chart: Chart | null = null

	let iterations: number = $trainingValues.iterations
	let IE: number[] = $trainingValues.iterationError

	onMount(() => {
		container = document.getElementById('container') as HTMLCanvasElement
		chart = new Chart(container, {
			type: 'line',
			options: {
				animation: {
					onComplete: () => {
						setIsvisibleSimulation()
					}
				}
			},
			data: {
				labels: [],

				datasets: [
					{
						label: 'Error por iteriación',
						data: [],
						fill: false,
						borderColor: 'rgb(75, 192, 192)'
					}
				]
			}
		})
		let i = 0
		let time = 3000 / iterations
		if (time <= 0) {
			time = 10
		}
		const intervalId = setInterval(() => {
			if (i < iterations) {
				chart?.data.labels?.push(i)
				chart?.data.datasets[0].data.push(IE[i])
				chart?.update()
				i++
			} else {
				clearInterval(intervalId)
			}
		}, time)
	})
</script>

<canvas id="container" class="w-full min-h-96 bg-slate-50"></canvas>
