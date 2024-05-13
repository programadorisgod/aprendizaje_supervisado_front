<script lang="ts">
	import simulation from '$lib/services/backPropagation/simulation/main'
	import getJson from '$lib/utils/fetchJson'
	import { onMount } from 'svelte'
	import {
		databaseStore,
		simulationStore
	} from '../configurationNeuralNetwork/stores/storesConfiguration'
	import fetchData from '$lib/utils/fetchData'
	import ChartSimulation from '$components/errorCorrection/simulationMode/charts/chartSimulation.svelte'

	onMount(async () => {
		const res = await getJson()
		const sm = await simulation(res.weights, res.thresholds, res.networkLayers)

		simulationStore.set(sm)

		const database = await fetchData()
		databaseStore.set(database)
	})
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	
	{#await Promise.all([$simulationStore, $databaseStore]) then [simulations, database]}
		<ChartSimulation labels={database} data={simulations} />
	{/await}
</div>
