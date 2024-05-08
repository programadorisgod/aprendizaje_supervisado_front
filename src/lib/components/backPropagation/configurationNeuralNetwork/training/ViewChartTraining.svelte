<script lang="ts">
	import {
		setAppStatusModelMode,
		setModelBackPropagation,
		setUPloadFileToSimulationBP
	} from '$lib/stores/stores'
	import sendInformationNeuralNetwork from '$lib/utils/sendConfiguration'
	import {
		configurationNeuralNetwork,
		errorIteration,
		maxErorr,
		setTrainingFailed
	} from '../stores/storesConfiguration'
	import TrainingChart from './chart/TrainingChart.svelte'

	let backToTraining: boolean = false
	let isVisible: boolean = false

	const handleClick = async () => {
		if (backToTraining) {
			setTrainingFailed()
			setModelBackPropagation()
			setAppStatusModelMode()
		} else {
			setUPloadFileToSimulationBP()
			await sendInformationNeuralNetwork($configurationNeuralNetwork)
		}
	}

	const handleFinish = (event: CustomEvent) => {
		const value = event.detail.isVisible
		isVisible = value
	}

	$: if (!isNaN($errorIteration) && $errorIteration > $maxErorr) {
		backToTraining = true
	} else {
		backToTraining = false
	}
</script>

<div class="flex flex-col items-center font-bold gap-4">
	<TrainingChart on:finish={handleFinish} />
	{#if isVisible}
		<section class="flex flex-col items-center font-bold">
			<p class="text-cyan-50">
				{backToTraining
					? 'El entrenamiento no se completó satisfactoriaente, por favor vuelva a entrenar'
					: 'Ahora que está listo el entrenamiento, puede empezar la simulación'}
			</p>
			<button
				on:click={handleClick}
				class="text-center cursor-pointer bg-blue-500 text-white font-bold w-36 h-12 rounded-md mt-3 mb-4"
			>
				{backToTraining ? 'Volver a entrenar' : 'Simular'}
			</button>
		</section>
	{/if}
</div>
