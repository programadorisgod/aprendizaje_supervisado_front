<script lang="ts">
	import './css/configurationNeuralNetwork.css'
	let isChecked = false
	let isLimitadorDuroChecked = false
	let isReglaDeltaChecked = false
	let nextStep: Element | null | undefined
	let currentStep2: Element | null | undefined
	let valueInputRat: number
	let valueInputError: number
	let invalidRat: boolean
	let invalidError: boolean

	const hanleClickCheckBox = () => {
		isChecked = !isChecked
	}
	const handleLimitadorDuroClick = () => {
		isLimitadorDuroChecked = !isLimitadorDuroChecked
	}
	const handleReglaDeltaClick = () => {
		isReglaDeltaChecked = !isReglaDeltaChecked
	}
	const handleOnSubmit = (event: SubmitEvent) => {
		event.preventDefault()

		if (valueInputRat <= 0 || valueInputRat > 1) {
			invalidRat = true
		} else {
			invalidRat = false
		}

		if (valueInputError < 0 || valueInputError > 0.1) {
			invalidError = true
		} else {
			invalidError = false
		}
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
		} else {
			nextStep?.classList.add('fade_hidden')
		}

		if (isLimitadorDuroChecked && isReglaDeltaChecked) {
			currentStep2 = nextStep?.nextElementSibling
			currentStep2?.classList.remove('fade_hidden')
		} else {
			currentStep2?.classList.add('fade_hidden')
		}
	}
</script>

<section class="mt-12 text-white">
	<div class="step flex">
		<label>
			<input
				on:click={hanleClickCheckBox}
				bind:checked={isChecked}
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
			/>
			Función de activación 'Limitador Duro'
		</label>
		<label>
			<input
				type="checkbox"
				class="appearance-none w-4 h-4 rounded-lg"
				bind:checked={isReglaDeltaChecked}
				on:click={handleReglaDeltaClick}
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
			/>

			<label for="rata"> Rata de aprendiza </label>
			<input
				type="number"
				id="rata"
				class="text-black w-36 h-9 rounded-md outline-none"
				placeholder="rata"
				on:change={handleKeyUpRat}
				step="0.0001"
			/>
			{#if invalidRat}
				<p class="text-red-600">Por favor ingrese una rata de aprendizaje valida mayor que 0 y menor o igual a 1</p>
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

			<button class="text-center bg-gray-300 text-black w-20 h-8 rounded-sm mt-3 mb-4"
				>Entrenar</button
			>
		</form>
	</div>
</section>
