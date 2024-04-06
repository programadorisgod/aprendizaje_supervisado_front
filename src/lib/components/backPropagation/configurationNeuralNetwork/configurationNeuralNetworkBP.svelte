<script lang="ts">
	import type { SelectOptionType } from 'flowbite-svelte'
	import { Select } from 'flowbite-svelte'
	import './configurationNeuralNetworkBP.css'
	import { fade } from 'svelte/transition'
	import { FA } from '../CONsTANTS/functionsActivations'
	export let input_params: number[][]
	let numberOfLayersHiddens: SelectOptionType<any>[] = [
		{
			name: 1,
			value: 1
		},
		{
			name: 2,
			value: 2
		},
		{
			name: 3,
			value: 3
		}
	]
	let functionOfActivationLayerHiden: SelectOptionType<any>[] = [
		{ name: 'Tangente hiperbólica', value: FA.TH },
		{ name: 'Sigmoide', value: FA.SIGMOIDE },
		{ name: 'Seno', value: FA.SENO }
	]

	let functionOfActivationLayerOutput: SelectOptionType<any>[] = [
		{ name: 'Tangente hiperbólica', value: FA.TH },
		{ name: 'Sigmoide', value: FA.SIGMOIDE },
		{ name: 'Seno', value: FA.SENO },
		{ name: 'Lineal', value: FA.LINEAL }
	]

	let selectedNumberOfLayersHiddens: number = 0
	let layers: number[]
	let layerValues: number[] = [0, 0, 0]
	let layersFA: string[] = ['', '', '', '']

	$: {
		layers = Array.from({ length: selectedNumberOfLayersHiddens }, (_, i) => i + 1)
		if (selectedNumberOfLayersHiddens !== 0) {
			const currentStep = document.querySelector('.step:not(fade_hidden)')

			const nextStep = currentStep?.nextElementSibling

			nextStep?.classList.remove('fade_hidden')
		}
	}

	const handleInputChange = (event: Event, index: number) => {
		const target = event.target as HTMLInputElement
		layerValues[index] = Number(target.value)
	}
	const handledSelectChange = (event: Event, index?: number) => {
		const target = event.target as HTMLSelectElement
		if (index != null) {
			layersFA[index] = target.value
		} else {
			layersFA[3] = target.value
		}
	}
</script>

<article class="w-auto h-full mt-5 text-white flex flex-col">
	<div class="step">
		<label for="">
			Seleccione el número de capas ocultas:
			<Select
				bind:value={selectedNumberOfLayersHiddens}
				class="mt-2 w-36 h-10"
				items={numberOfLayersHiddens}
			></Select>
		</label>
	</div>

	<div class="step fade_hidden flex flex-col gap-2">
		<hr class="mt-3" />
		{#each layers as layer, index (layer)}
			<div class="flex gap-6 mt-2 justify-center items-center">
				<label transition:fade for="" class="flex flex-col">
					Numero de neuronas de la <strong>capa {layer}</strong>
					<input
						class="text-black w-36 h-10 rounded-md outline-none mt-2"
						type="number"
						min={layer === 1 ? input_params[0][0] : 1}
						on:input={(event) => handleInputChange(event, index)}
					/>
				</label>
				<label for="" class="flex flex-col">
					Seleccione la funcion de activación para la <strong>capa {layer}</strong>
					<Select
						class="mt-2 w-36 h-10"
						items={functionOfActivationLayerHiden}
						on:input={(event) => handledSelectChange(event, index)}
					></Select>
				</label>
			</div>
		{/each}

		<label for="" class="flex flex-col mt-5">
			Seleccione la funcion de activación para la <strong>capa de salida</strong>
			<Select
				class="w-36 h-10"
				items={functionOfActivationLayerHiden}
				on:input={(event) => handledSelectChange(event)}
			></Select>
		</label>
	</div>
</article>
