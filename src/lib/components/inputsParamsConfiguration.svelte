<script lang="ts">
	import supervisedLearningMain from '$lib/services/main'
	import {
		appStatus,
		setAppStatusLoading,
		setAppStatusTrainingMode,
		setSimulationValues
	} from '$lib/stores/stores'
	import type { SimulationValues } from '$lib/types/simulationValues'
	import showError from '$lib/utils/valitadeInputs'
	import { Alert } from 'flowbite-svelte'
	export let weight: number[][]
	export let thresholds: number[]

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

		setAppStatusLoading('Entrenando...')

		const values = await supervisedLearningMain(
			valueInputIterations!,
			valueInputRat!,
			valueInputError!,
			weight,
			thresholds
		)

		if (values !== undefined) {
			const sm: SimulationValues = {
				weights: values.weights,
				thresholds: values.thresholds
			}

			setSimulationValues(sm)
			setTimeout(() => {
				setAppStatusTrainingMode(values, valueInputError!)
			}, 2000)
		}
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
