<script lang="ts">
	import simulation from '$lib/services/correctionOfErrors/simulation/main'
	import { isVisibleSimulation } from '$lib/stores/stores'
	import { onMount } from 'svelte'
	import ChartSimulation from './charts/chartSimulation.svelte'
	import fetchData from '$lib/utils/fetchData'
	import { writable } from 'svelte/store'
	let simulationsStore = writable<number[][]>([])
	let databaseStore = writable<number[][]>([])

	onMount(async () => {
		const r = await fetchData('simulation')
		const w = r.weights
		const u = r.thresholds

		const simulations = await simulation(w, u)
		simulationsStore.set(simulations)

		const database = await fetchData()
		databaseStore.set(database)
	})
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	{#if isVisibleSimulation}
		{#await Promise.all([$simulationsStore, $databaseStore])}
			<p>Realizando simulación...</p>
		{:then [simulations, database]}
			<ChartSimulation labels={database} data={simulations} />
		{/await}
	{/if}
</div>
