<script lang="ts">
	import Chart from 'chart.js/auto'
	import { afterUpdate, onMount } from 'svelte'
	import { valuesIteration } from '../../stores/storesConfiguration'

	let container: HTMLCanvasElement | null
	let chart: Chart | null = null
	valuesIteration.subscribe((value) => console.log(value))

	onMount(() => {
		container = document.getElementById('container') as HTMLCanvasElement
		chart = new Chart(container, {
			type: 'line',
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
	})
	afterUpdate(() => {
		console.log('entro')
		console.log($valuesIteration)

		chart?.data.labels?.push($valuesIteration.iterationValue)
		chart?.data.datasets[0].data.push($valuesIteration.error)
	})
</script>

<canvas id="container" class="w-full min-h-96 bg-slate-50"></canvas>
