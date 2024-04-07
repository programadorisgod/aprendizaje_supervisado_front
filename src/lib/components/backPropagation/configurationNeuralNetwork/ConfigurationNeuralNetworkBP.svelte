<script lang="ts">
	import type { SelectOptionType } from 'flowbite-svelte'
	import { Select } from 'flowbite-svelte'
	import './configurationNeuralNetworkBP.css'
	import { fade } from 'svelte/transition'
	import { FA } from '../CONsTANTS/functionsActivations'
	import Button from '$components/shared/Button.svelte'
	import Chart from './chart/Chart.svelte'
	import { every } from 'd3'

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
	let selectedNumberOfLayersOutput: string = ''
	let layers: number[]
	let layerValues: number[] = [0, 0, 0]
	let layersFA: string[] = ['', '', '', '']
	let nextStep: Element | null | undefined
	let error: boolean = false
	let show: boolean = false
	let showErrorInputLayer: boolean = false
	$: {
		layers = Array.from({ length: selectedNumberOfLayersHiddens }, (_, i) => i + 1)
		if (selectedNumberOfLayersHiddens !== 0) {
			const currentStep = document.querySelector('.step:not(fade_hidden)')

			nextStep = currentStep?.nextElementSibling

			nextStep?.classList.remove('fade_hidden')
		}

		if (selectedNumberOfLayersOutput !== '' && layerValues.every((value) => value < 100)) {
			const nextSetpFinal = nextStep?.nextElementSibling

			nextSetpFinal?.classList.remove('fade_hidden')
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
	const handleClick = () => {
		if (layerValues[0] < input_params[0][0]) {
			showErrorInputLayer = true
		}
		if (layerValues[0] === 0 && layers.length === 1) {
			error = true
			return
		} else {
			error = false
		}

		if (layerValues[0] === 0 && layerValues[1] === 0 && layers.length === 2) {
			error = true
			return
		} else {
			error = false
		}

		if (
			layerValues[0] === 0 &&
			layerValues[1] === 0 &&
			layerValues[2] === 0 &&
			layerValues.length === 3
		) {
			error = true
			return
		} else {
			error = false
		}
		show = true
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
				items={functionOfActivationLayerOutput}
				on:input={(event) => handledSelectChange(event)}
				bind:value={selectedNumberOfLayersOutput}
			></Select>
		</label>

		{#if showErrorInputLayer}
			<p class="text-red-600">
				El numero de neuronas de la capa 1, no puede ser menor al nuemero de entradas
			</p>
		{/if}
		{#if error}
			{error}
			<p class="text-red-600">Por llene todo los campos</p>
		{/if}
	</div>
	<div class="step fade_hidden mt-3">
		<Button on:click={handleClick} message="Mostrar topología"></Button>
	</div>

	{#if layerValues.every((value) => value < 100) && show && showErrorInputLayer === false}
		<Chart inputs={input_params[0][0]} {layers} {layerValues} layerOutput={input_params[0][1]} />
	{/if}
</article>
