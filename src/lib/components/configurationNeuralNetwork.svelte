<script lang="ts">
	import { Alert } from 'flowbite-svelte'
	import './css/configurationNeuralNetwork.css'
	import supervisedLearningMain from '$lib/services/main'

	let isChecked = false
	let isLimitadorDuroChecked = false
	let isReglaDeltaChecked = false
	let nextStep: Element | null | undefined
	let currentStep2: Element | null | undefined
	let valueInputRat: number | undefined
	let valueInputError: number | undefined
	let valueInputIterations: number | undefined
	let invalidRat: boolean
	let invalidError: boolean
	let isVisbleError: boolean = false

	const hanleClickCheckBox = () => {
		isChecked = !isChecked
	}
	const handleLimitadorDuroClick = () => {
		isLimitadorDuroChecked = !isLimitadorDuroChecked
	}
	const handleReglaDeltaClick = () => {
		isReglaDeltaChecked = !isReglaDeltaChecked
	}

	const onChange = (event: Event) => {
		const target = event.target as HTMLInputElement
		if (target.checked) target.disabled = true
	}

	const handleOnSubmit = (event: SubmitEvent) => {
		event.preventDefault()

		if (
			valueInputError === undefined ||
			valueInputRat === undefined ||
			valueInputIterations === undefined
		) {
			isVisbleError = true
			return
		} else {
			isVisbleError = false
		}

		if (valueInputRat! <= 0 || valueInputRat! > 1) {
			invalidRat = true
		} else {
			invalidRat = false
		}

		if (valueInputError! < 0 || valueInputError! > 0.1) {
			invalidError = true
		} else {
			invalidError = false
		}

		const values = supervisedLearningMain(valueInputIterations, valueInputRat, valueInputError)
		console.log(values)
	}

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

	$: {
		if (isChecked) {
			const currentStep = document.querySelector('.step:not(fade_hidden)')

			nextStep = currentStep?.nextElementSibling

			nextStep?.classList.remove('fade_hidden')
		}

		if (isLimitadorDuroChecked && isReglaDeltaChecked) {
			currentStep2 = nextStep?.nextElementSibling

			currentStep2?.classList.remove('fade_hidden')
		}
	}
</script>

<section class="mt-12 text-white">
	<div class="step flex">
		<label>
			<input
				on:click={hanleClickCheckBox}
				bind:checked={isChecked}
				on:change={onChange}
				type="checkbox"
				class="appearance-none w-4 h-4 rounded-lg"
			/>
			Inicializar pesos y umbrales
		</label>
	</div>

	<div class="step flex flex-col fade_hidden">
		<label>
			<input
				type="checkbox"
				class="appearance-none w-4 h-4 rounded-lg"
				on:click={handleLimitadorDuroClick}
				bind:checked={isLimitadorDuroChecked}
				on:change={onChange}
			/>
			Función de activación 'Limitador Duro'
		</label>
		<label>
			<input
				type="checkbox"
				class="appearance-none w-4 h-4 rounded-lg"
				bind:checked={isReglaDeltaChecked}
				on:click={handleReglaDeltaClick}
				on:change={onChange}
			/>
			Algoritmo de entrenamieto 'Regla Delta'
		</label>
	</div>

	<div class="step fade_hidden mt-4">
		<form on:submit={handleOnSubmit} class="step flex flex-col justify-center">
			<label for="iterations"> Numero de iteraciones </label>
			<input
				type="number"
				id="iterations"
				class="text-black w-36 h-9 rounded-md outline-none"
				placeholder="Iteraciones"
				min={1}
				on:keyup={handleKeyUpIterations}
			/>

			<label for="rata"> Rata de aprendizaje </label>
			<input
				type="number"
				id="rata"
				class="text-black w-36 h-9 rounded-md outline-none"
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
				class="text-black w-36 h-9 rounded-md outline-none"
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
			<button class="text-center bg-blue-500 text-white font-bold w-36 h-8 rounded-md mt-3 mb-4"
				>Entrenar</button
			>
		</form>
	</div>
</section>
