<script lang="ts">
	import { onMount } from 'svelte'
	import fetchData from '$lib/utils/fetchData'
	import StepLoading from './StepLoading.svelte'
	import NeuralNetwork from './neuralNetwork.svelte'
	import ConfigurationNeuralNetwork from './configurationNeuralNetwork.svelte'

	let input_params: Array<Array<number>>

	onMount(async () => {
		input_params = await fetchData('input_params')
	})
</script>

{#if input_params}
	{#each input_params as param}
		<ul class="text-gray-50 text-3xl">
			<li>Entradas: {param[0]}</li>
			<li>Salidas: {param[1]}</li>
			<li>Patrones: {param[2]}</li>
		</ul>
	{/each}
	<NeuralNetwork {input_params} />
	<ConfigurationNeuralNetwork />
{:else}
	<StepLoading data="Obteniendo los parametros de entrada..." />
{/if}
