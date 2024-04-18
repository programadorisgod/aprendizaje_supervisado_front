<script lang="ts">
	import { Select } from 'flowbite-svelte'
	import './configurationNeuralNetworkBP.css'
	import { fade } from 'svelte/transition'
	import Button from '$components/shared/Button.svelte'
	import Chart from './chart/Chart.svelte'
	import {
		algorithmTraining,
		functionOfActivationLayerHiden,
		functionOfActivationLayerOutput,
		numberOfLayersHiddens
	} from '../../CONsTANTS/selectOptions'
	import InputsParams from './InputsParams.svelte'
	import WeightAndThresholds from './WeightAndThresholds.svelte'
	import {
		storeFA,
		storeLayerValues,
		storeNumberOfLayersHiddens,
		trainingFailed
	} from '../stores/storesConfiguration'
	import { onMount } from 'svelte'

	export let input_params: number[][]
	let selectedNumberOfLayersHiddens: number = 0
	let selectedFAOfLayersOutput: string = ''
	let selectedAlogrithms: string = ''
	let layers: number[]
	let layerValues: number[] = [0, 0, 0]
	let layersFA: string[] = ['', '', '', '']
	let nextStep: Element | null | undefined
	let nextStep2: Element | null | undefined
	let stepFinal: Element | null | undefined
	let error: boolean = false
	let show: boolean = false
	let showErrorInputLayer: boolean = false
	let isVisible = false
	let isChecked: boolean = false
	let data: { pesos: [][][]; umbrales: [][] }

	onMount(() => {
		if ($trainingFailed) {
			selectedNumberOfLayersHiddens = $storeNumberOfLayersHiddens
			layersFA = $storeFA
			selectedFAOfLayersOutput = $storeFA[$storeFA.length - 1]
			layerValues = $storeLayerValues
		}
	})

	$: {
		layers = Array.from({ length: selectedNumberOfLayersHiddens }, (_, i) => i + 1)

		if (selectedNumberOfLayersHiddens !== 0) {
			const currentStep = document.querySelector('.step:not(fade_hidden)')

			nextStep = currentStep?.nextElementSibling

			nextStep?.classList.remove('fade_hidden')
		}

		if (selectedFAOfLayersOutput !== '' && layerValues.every((value) => value < 100)) {
			nextStep2 = nextStep?.nextElementSibling

			nextStep2?.classList.remove('fade_hidden')
			isVisible = true
		}

		if (
			(show && !showErrorInputLayer) ||
			(!show && selectedAlogrithms && !isVisible && !showErrorInputLayer)
		) {
			if (nextStep2) {
				stepFinal = nextStep2.nextElementSibling
			} else {
				stepFinal = document.querySelector('.inputs_params')
			}
			stepFinal?.classList.remove('fade_hidden')
		}
	}
	const handleMessage = (event: CustomEvent) => {
		data = event.detail
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
	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement
		if (target.checked) target.disabled = true
	}

	const handleClick = () => {
		if (layerValues[0] < input_params[0][0]) {
			showErrorInputLayer = true
		} else {
			showErrorInputLayer = false
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
		if (selectedAlogrithms === '') {
			error = true
		} else {
			error = false
		}

		show = true
	}
</script>

<article class="w-full h-full mt-5 text-white flex flex-col">
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
			<div class="flex gap-6 mt-2">
				<label transition:fade for="" class="flex flex-col">
					Numero de neuronas de la <strong>capa {layer}</strong>
					<input
						class="text-black w-36 h-10 rounded-md outline-none mt-2"
						type="number"
						min={layer === 1 ? input_params[0][0] : 1}
						on:input={(event) => handleInputChange(event, index)}
						bind:value={layerValues[index]}
					/>
				</label>
				<label for="" class="flex flex-col">
					Seleccione la funcion de activación para la <strong>capa {layer}</strong>
					<Select
						class="mt-2 w-36 h-10"
						bind:value={$storeFA[index]}
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
				bind:value={selectedFAOfLayersOutput}
			></Select>
		</label>

		<label for="">
			Algoritmo de entrenamieto:
			<Select class="mt-2 w-40 h-10" bind:value={selectedAlogrithms} items={algorithmTraining}
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
	<div class="step fade_hidden mt-3 inputs_params">
		<label>
			<input
				bind:checked={isChecked}
				on:change={(event) => handleChange(event)}
				class="appearance-none w-4 h-4 rounded-lg"
				type="checkbox"
			/>
			Inicializar pesos y umbrales
		</label>
	</div>

	{#if isChecked}
		<WeightAndThresholds on:message={handleMessage} {layerValues} />

		<InputsParams
			{data}
			{layerValues}
			layerOutput={input_params[0][1]}
			{layersFA}
			numberOfLayersHiddens={selectedNumberOfLayersHiddens}
		/>
	{/if}
</article>
