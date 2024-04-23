<script lang="ts">
	import type { training } from '$lib/services/backPropagation/interface'
	import backPropagationMain from '$lib/services/backPropagation/main'
	import { setAppStatusLoading, setAppStatusTrainingModeBP } from '$lib/stores/stores'
	import showError from '$lib/utils/valitadeInputs'
	import { Alert } from 'flowbite-svelte'
	import {
		setConfiguration,
		setFA,
		setIterationsError,
		setLayerValues,
		setMaxError,
		setNumberOfLayersHiddens,
		setValuesTraining
	} from '../stores/storesConfiguration'

	export let layerValues: number[] = []

	export let layerOutput: number = 0
	export let layersFA: Array<string> = ['']
	export let data: { pesos: [][][]; umbrales: [][] }
	export let numberOfLayersHiddens: number

	let valueInputRat: number | undefined
	let valueInputError: number | undefined
	let valueInputIterations: number | undefined
	let invalidRat: boolean
	let invalidError: boolean
	let isVisbleError: boolean = false

	const handleKeyUpIterations = (event: Event) => {
		const target = event?.target as HTMLInputElement

		valueInputIterations = parseInt(target?.value)
	}
	const handleKeyUpRat = (event: Event) => {
		const target = event?.target as HTMLInputElement
		valueInputRat = parseFloat(target?.value)
	}

	const handleKeyUpError = (event: Event) => {
		const target = event?.target as HTMLInputElement
		valueInputError = parseFloat(target?.value)
	}

	const handleOnSubmit = async (event: SubmitEvent) => {
		event.preventDefault()

		if (showError(valueInputError, valueInputRat, valueInputIterations)) {
			isVisbleError = true
			return
		} else {
			isVisbleError = false
		}

		if (valueInputRat! <= 0 || valueInputRat! > 1) {
			invalidRat = true
			return
		} else {
			invalidRat = false
		}
		if (valueInputError! < 0 || valueInputError! > 0.1) {
			invalidError = true
			return
		} else {
			invalidError = false
		}
		const networkLayers = []

		layerValues.forEach((neuron, index) => {
			if (neuron != 0) {
				networkLayers.push({
					neurons: neuron,
					activationFunction: layersFA[index]
				})
			}
		})

		networkLayers.push({ neurons: layerOutput, activationFunction: layersFA[layersFA.length - 1] })

		setNumberOfLayersHiddens(numberOfLayersHiddens)
		setFA(layersFA)
		setLayerValues(layerValues)

		const values: training = await backPropagationMain(
			valueInputIterations!,
			valueInputRat!,
			valueInputError!,
			data.pesos,
			data.umbrales,
			networkLayers
		)

		setAppStatusLoading('Entrenando...')
		
		setAppStatusTrainingModeBP()

		setMaxError(valueInputError!)

		setIterationsError(values.iterationError[values.iterationError.length - 1])

		setConfiguration({
			networkLayers: networkLayers,
			thresholds: values.thresholds,
			weights: values.weights
		})

		setValuesTraining({
			error: values.iterationError,
			iterations: values.iterations
		})
	}
</script>

<form on:submit={handleOnSubmit} class="step flex flex-col justify-center">
	<label for="iterations"> Numero de iteraciones </label>
	<input
		type="number"
		id="iterations"
		class="text-black w-36 h-10 rounded-md outline-none mt-2"
		placeholder="Iteraciones"
		min={1}
		on:keyup={handleKeyUpIterations}
		on:input={handleKeyUpIterations}
	/>

	<label for="rata"> Rata de aprendizaje </label>
	<input
		type="number"
		id="rata"
		class="text-black w-36 h-10 rounded-md outline-none mt-2"
		placeholder="rata"
		on:change={handleKeyUpRat}
		step="0.0001"
	/>
	{#if invalidRat}
		<p class="text-red-600">
			Por favor ingrese una rata de aprendizaje valida mayor que 0 y menor o igual a 1
		</p>
	{/if}

	<label for="error"> Error máximo permitido </label>
	<input
		type="number"
		id="error"
		class="text-black w-36 h-10 rounded-md outline-none mt-2"
		placeholder="Error"
		on:keyup={handleKeyUpError}
		step="0.0001"
	/>
	{#if invalidError}
		<p class="text-red-600">Por favor ingrese un error valido entre 0 y 0.1</p>
	{/if}
	{#if isVisbleError}
		<Alert class="mt-2">
			<span class="font-bold">!Error!</span>
			Por favor, no deje parametros sin inicializar
		</Alert>
	{/if}

	<button class="text-center bg-blue-500 text-white font-bold w-36 h-10 rounded-md mt-3 mb-4"
		>Entrenar</button
	>
</form>
