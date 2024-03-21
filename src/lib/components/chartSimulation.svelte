<script lang="ts">
	import { Line } from 'svelte-chartjs'

	export let labels: number[][]
	export let data: number[][]
	let expectOuputs: number[][] | number[]

	const realOuputs = labels.map((label: number[]) => label[1])
	const patrons = Array.from({ length: labels.length }, (_, index) => index)

	if (data[0]?.length > 1) {
		expectOuputs = data.map((row) => row)
	} else {
		expectOuputs = data.map((row) => row[0])
	}

	const dataChart = {
		labels: patrons,
		datasets: [
			{
				label: 'Salidas reales',
				fill: true,
				lineTension: 0.3,
				backgroundColor: 'rgba(225, 204,230, .3)',
				borderColor: 'rgb(205, 130, 158)',
				borderCapStyle: 'butt' as const,
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter' as const,
				pointBorderColor: 'rgb(205, 130,1 58)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: realOuputs.flat()
			},
			{
				label: 'Salida esperada',
				fill: true,
				lineTension: 0.3,
				backgroundColor: 'rgba(184, 185, 210, .3)',
				borderColor: 'rgb(35, 26, 136)',
				borderCapStyle: 'butt' as const,
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter' as const,
				pointBorderColor: 'rgb(35, 26, 136)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: expectOuputs.flat()
			}
		]
	}
</script>

<div class="w-full min-h-96 bg-slate-50">
	<h3 class=" w-full text-center bg-white">Gráfica de la simulación</h3>
	<Line data={dataChart} options={{ responsive: true }} />
</div>
