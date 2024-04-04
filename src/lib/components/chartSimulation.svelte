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
	import EndOfTraining from './endOfTraining.svelte'

	export let labels: number[][]
	export let data: number[][]
	let expectOuputs: number[][] | number[]
	let YDs: string[] | number[] = []
	let YRs: string[] | number[] = []

	const realOuputs = labels.map((label: number[]) => label[1])

	const p = labels.map((labels: number[]) => labels[0].join(' '))
	const patrons = Array.from({ length: labels.length }, (_, index) => index)

	if (data[0]?.length > 1) {
		expectOuputs = data.map((row) => row)
		YDs = expectOuputs.map((row) => row.join(' '))
		YRs = realOuputs.map((row) => row.join(' '))
	} else {
		expectOuputs = data.map((row) => row[0])
		YDs = expectOuputs
		YRs = realOuputs
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

	const dataTable = patrons.map((patron, index) => {
		return {
			patron: p[index],
			YD: YDs[index],
			YR: YRs[index]
		}
	})
</script>

<div class="w-full h-full mb-2 items-center flex flex-col">
	<section class="bg-white w-full">
		<h3 class=" w-full text-center bg-white">Gráfica de la simulación</h3>
		<Line data={dataChart} options={{ responsive: true }} />
		<div class="bg-[#111827] mt-2">
			<Table color="blue">
				<TableHead>
					<TableHeadCell>Patrón</TableHeadCell>
					<TableHeadCell>YR</TableHeadCell>
					<TableHeadCell>YD</TableHeadCell>
				</TableHead>
				<TableBody tableBodyClass="divide-y">
					{#each dataTable as patron}
						<TableBodyRow>
							<TableBodyCell>{patron.patron}</TableBodyCell>
							<TableBodyCell>{patron.YR}</TableBodyCell>
							<TableBodyCell>{patron.YD}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</section>
	<EndOfTraining />
</div>
