<script lang="ts">
	import Chart from 'chart.js/auto'
	import { createEventDispatcher, onMount } from 'svelte'
	import {  setValuesTraining, trainingFailed, valuesIterationTraining } from '../../stores/storesConfiguration'
	const dispatch = createEventDispatcher()

	const handleBoolean = () => {
		dispatch('finish', {
			isVisible: true
		})
	}

	let container: HTMLCanvasElement | null
	let chart: Chart | null = null
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

 
	let i = 0
	let time = 3000 / $valuesIterationTraining.iterations
	if (time <= 0) {
		time = 10
	}

	const intervalId = setInterval(() => {
		if (i < $valuesIterationTraining.iterations) {
			chart?.data.labels?.push(i),
				chart?.data.datasets[0].data.push($valuesIterationTraining.error[i])
			chart?.update()
			i++
		} else {
     handleBoolean()
			clearInterval(intervalId)
		}
	}, time)
</script>

<canvas id="container" class="w-full min-h-96 bg-slate-50"></canvas>
