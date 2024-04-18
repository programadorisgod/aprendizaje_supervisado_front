<script lang="ts">
	import { onMount } from 'svelte'
	import fetchData from '$lib/utils/fetchData'
	import StepLoading from '../shared/StepLoading.svelte'
	import NeuralNetwork from './charts/neuralNetwork.svelte'
	import ConfigurationNeuralNetwork from '../errorCorrection/configurationNeuralNetwork/configurationNeuralNetwork.svelte'
	import { modelBackPropagation } from '$lib/stores/stores'
	import ConfigurationNeuralNetworkBp from '$components/backPropagation/configurationNeuralNetwork/training/ConfigurationNeuralNetworkBP.svelte'

	let input_params: Array<Array<number>>

	onMount(async () => {
		input_params = await fetchData('input-params')
	})
</script>

<h1 class=" text-center mb-4 opacity-70 font-bold text-slate-50 text-2xl">
	{$modelBackPropagation ? 'Modelo en uso Backpropagation' : 'Correción de errores'}
</h1>

{#if input_params}
	<section class="w-full h-full grid place-content-center">
		{#each input_params as param}
			<ul class="text-gray-50 text-3xl w-[300px]">
				<li>Entradas: {param[0]}</li>
				<li>Salidas: {param[1]}</li>
				<li>Patrones: {param[2]}</li>
			</ul>
		{/each}
	</section>
	<section class="w-full h-full grid place-content-center">
		{#if !$modelBackPropagation}
			<NeuralNetwork {input_params} />
			<ConfigurationNeuralNetwork {input_params} />
		{:else}
			<ConfigurationNeuralNetworkBp {input_params} />
		{/if}
	</section>
{:else}
	<StepLoading data="Obteniendo los parametros de entrada..." />
{/if}
