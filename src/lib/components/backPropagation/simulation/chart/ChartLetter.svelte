<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte'
	import { Line } from 'svelte-chartjs'
	import { onMount } from 'svelte'
	import CanvasConfetti from 'canvas-confetti'
	import EndOfSimulation from '$components/errorCorrection/simulationMode/charts/endOfSimulation.svelte'

	onMount(() => {
		CanvasConfetti()
	})
	export let values: [number[], number[]][]
	export let labels: number[][]

	const realOuputs = values?.map((item) => item[1])?.flat()
	let expectOuputs: number[][] | number[] = [1, 1, 1, 0, 1, 0, 1, 0, 1]

	const patrons = Array.from({ length: realOuputs.length }, (_, index) => index)

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
				data: realOuputs
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
				data: expectOuputs
			}
		]
	}

	const dataTable = [
		['joven', 'miopia', 'no', 'blandas'],
		['joven', 'miopia', 'si', 'blandas'],
		['joven', 'hipermetropia', 'no', 'blandas'],
		['joven', 'hipermetropia', 'si', 'duras'],
		['pre-presbicia', 'miopia', 'no', 'blandas'],
		['pre-presbicia', 'miopia', 'si', 'duras'],
		['pre-presbicia', 'hipermetropia', 'no', 'blandas'],
		['presbicia', 'miopia', 'si', 'duras'],
		['presbicia', 'hipermetropia', 'no', 'blandas']
	]
</script>

<div class="w-full h-full mb-2 items-center flex flex-col">
	<section class="bg-white w-full">
		<h3 class=" w-full text-center bg-white">Gráfica de la simulación</h3>
		<Line data={dataChart} options={{ responsive: true }} />
		<div class="bg-[#111827] mt-2">
			<Table color="blue">
				<TableHead>
					<TableHeadCell>Edad</TableHeadCell>
					<TableHeadCell>Anomalia</TableHeadCell>
					<TableHeadCell>Astigmatismo</TableHeadCell>
					<TableHeadCell>Lentes de contacto (YR)</TableHeadCell>
					<TableHeadCell>Lentes de contacto (YD)</TableHeadCell>
				</TableHead>
				<TableBody tableBodyClass="divide-y">
					{#each dataTable as patron, index}
						<TableBodyRow>
							<TableBodyCell>{patron[0]}</TableBodyCell>
							<TableBodyCell>{patron[1]}</TableBodyCell>
							<TableBodyCell>{patron[2]}</TableBodyCell>
							<TableBodyCell>{patron[3]}</TableBodyCell>
							<TableBodyCell>{expectOuputs[index] === 1 ? 'blandas' : 'duras'}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</section>
	<EndOfSimulation />
</div>
