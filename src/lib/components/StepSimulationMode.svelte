<script lang="ts">
	import simulation from '$lib/services/simulation/main'
	import { isVisbleSimulation, simultaionValues } from '$lib/stores/stores'
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

		const simulations = await simulation(w, u)
		simulationsStore.set(simulations)

		const database = await fetchData()
		databaseStore.set(database)
	})
</script>

<div class="w-[900px] h-[600px] flex flex-col justify-center items-center">
	{#if isVisbleSimulation}
		{#await Promise.all([$simulationsStore, $databaseStore])}
			<p>Realizando simulación...</p>
		{:then [simulations, database]}
			<ChartSimulation labels={database} data={simulations} />
			{CanvasConfetti()}
		{/await}
	{/if}
</div>
