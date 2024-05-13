<script lang="ts">
	import simulation from '$lib/services/backPropagation/simulation/main'
	import getJson from '$lib/utils/fetchJson'
	import { onMount } from 'svelte'
	import {
		databaseStore,
		simulationStore,
		typeLetter,
		valuesStore
	} from '../configurationNeuralNetwork/stores/storesConfiguration'
	import fetchData from '$lib/utils/fetchData'
	import ChartSimulation from '$components/errorCorrection/simulationMode/charts/chartSimulation.svelte'
	import ChartLetter from './chart/ChartLetter.svelte'
	import fecthLetter from '$lib/utils/fetchTypeLetter'

	onMount(async () => {
		const res = await getJson()
		const sm = await simulation(res.weights, res.thresholds, res.networkLayers)

		simulationStore.set(sm)

		const database = await fetchData()
		databaseStore.set(database)

		if ($typeLetter) {
			const valuesdb = await fecthLetter()
			valuesStore.set(valuesdb)
		}
	})
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	{#await Promise.all( [$simulationStore, $valuesStore, $databaseStore] ) then [simulations, values, database]}
		{#if !$typeLetter}
			<ChartSimulation labels={database} data={simulations} />
		{:else}
			<ChartLetter labels={simulations} {values} />
		{/if}
	{/await}
</div>
