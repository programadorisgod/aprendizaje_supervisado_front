<script lang="ts">
	import { Select, type SelectOptionType } from 'flowbite-svelte'
	import './css/configurationNeuralNetwork.css'
	import InputsParamsConfiguration from './inputsParamsConfiguration.svelte'

	let isChecked = false
	let nextStep: Element | null | undefined
	let currentStep2: Element | null | undefined

	let selectedFunctions: string
	let selectedAlogrithms: string
	let functions: SelectOptionType<any>[] = [{ name: 'Limitador Duro', value: 'Limitador Duro' }]
	let algorithms: SelectOptionType<any>[] = [{ name: 'Regla Delta', value: 'Regla Delta' }]

	const hanleClickCheckBox = () => {
		isChecked = !isChecked
	}

	const onChange = (event: Event) => {
		const target = event.target as HTMLInputElement
		if (target.checked) target.disabled = true
	}

	$: {
		if (isChecked) {
			const currentStep = document.querySelector('.step:not(fade_hidden)')

			nextStep = currentStep?.nextElementSibling

			nextStep?.classList.remove('fade_hidden')
			window.scroll({
				top: 100,
				left: 0,
				behavior: 'smooth'
			})
		}

		if (selectedFunctions !== '' && selectedAlogrithms !== '') {
			currentStep2 = nextStep?.nextElementSibling

			currentStep2?.classList.remove('fade_hidden')
			window.scroll({
				top: document.body.scrollHeight,
				left: 0,
				behavior: 'smooth'
			})
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
		<label for="">
			Función de activación:
			<Select class="mt-2 w-36 h-10" items={functions} bind:value={selectedFunctions} />
		</label>
		<label for="">
			Algoritmo de entrenamieto:
			<Select class="mt-2 w-36 h-10" items={algorithms} bind:value={selectedAlogrithms} />
		</label>
	</div>

	<InputsParamsConfiguration />
</section>
