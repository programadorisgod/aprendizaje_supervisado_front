<script lang="ts">
	import { Select, type SelectOptionType } from 'flowbite-svelte'
	import './configurationNeuralNetwork.css'
	import InputsParamsConfiguration from './inputsParamsTraining.svelte'
	import initWU from '$lib/services/init-w-u/init-w-u'

	export let input_params: Array<Array<number>>
	let isChecked = false
	let nextStep: Element | null | undefined
	let currentStep2: Element | null | undefined
	let weightArray: number[][]
	let thresholdsArray: number[]

	let selectedFunctions: string
	let selectedAlogrithms: string
	let functions: SelectOptionType<any>[] = [{ name: 'Limitador Duro', value: 'Limitador Duro' }]
	let algorithms: SelectOptionType<any>[] = [{ name: 'Regla Delta', value: 'Regla Delta' }]

	const hanleClickCheckBox = () => {
		const { weight, thresholds } = initWU(input_params[0][0], input_params[0][1])
		weightArray = weight
		thresholdsArray = thresholds
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
				top: 200,
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

<div class="w-full h-full text-white flex flex-col mt-2">
	<div class="step flex flex-col">
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
		{#if isChecked}
			<div class="mt-3 mb-3">
				<p>Matriz de pesos:[{weightArray.map((row) => row.join(' , ') + '  ')}]</p>
				<p>Vector de umbrales: [{thresholdsArray.join(' , ')}]</p>
			</div>
		{/if}
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

	<div class="step fade_hidden w-full">
		<InputsParamsConfiguration weight={weightArray} thresholds={thresholdsArray} />
	</div>
</div>
