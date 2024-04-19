<script lang="ts">
	import Chart from 'chart.js/auto'
	import { onMount } from 'svelte'
	import { valuesIteration } from '../../stores/storesConfiguration'

	let container: HTMLCanvasElement | null
	let chart: Chart | null = null
	let chartData: number[] = []
	let chartLabels: number[] = []

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
	valuesIteration.subscribe((value) => {
		console.log('Valor', value)

		if (chart && chart.data && chart.data.labels && chart.data.datasets && chart.data.datasets[0]) {
			console.log('entro a la grafica')

			chart.data.labels.push(value.error)
			chart.data.datasets[0].data.push(value.iterationValue)
			console.log(chart.data.labels)
       
			chart.update()
		}
	})
</script>

<canvas id="container" class="w-full min-h-96 bg-slate-50"></canvas>
