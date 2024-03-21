<script lang="ts">
	import simulation from '$lib/services/simulation/main'
	import { isVisbleSimulation, setAppInitMode, simultaionValues } from '$lib/stores/stores'
	import { onMount } from 'svelte'
	import ChartSimulation from './chartSimulation.svelte'
	import fetchData from '$lib/utils/fetchData'
	import { writable } from 'svelte/store'
	let simulationsStore = writable<number[][]>([])
	let databaseStore = writable<number[][]>([])
	import CanvasConfetti from 'canvas-confetti'
	onMount(async () => {
		const w: number[][] = $simultaionValues.weights
		const u: number[] = $simultaionValues.thresholds
		let setIsvisibleChartSimulation: boolean = false

		const simulations = await simulation(w, u)
		console.log(simulations)

		simulationsStore.set(simulations)
		const database = await fetchData()
		databaseStore.set(database)

		if (simulation !== undefined) {
			setIsvisibleChartSimulation = true
		}
	})

	const hanleOnclik = () => {
		document.location.reload()
	}
</script>

<div class="w-[900px] h-[600px] flex flex-col justify-center items-center">
	{#if isVisbleSimulation}
		{#await Promise.all([$simulationsStore, $databaseStore])}
			<p>Realizando simulación...</p>
		{:then [simulations, database]}
			<ChartSimulation labels={database} data={simulations} />
			{CanvasConfetti()}
			<button
				on:click={hanleOnclik}
				class="text-center bg-blue-500 text-white font-bold w-36 h-12 rounded-md mt-3 mb-4"
			>
				Finalizar simulación
			</button>
		{/await}
	{/if}
</div>
