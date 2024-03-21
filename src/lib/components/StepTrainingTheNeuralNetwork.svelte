<script lang="ts">
	import Chart from './chartTraining.svelte'
	import {
		setAppStatusModelMode,
		trainingValues,
		isVisbleSimulation,
		setAppStatusSimulationUploadMode,
		setFetchDataToSimulation
	} from '$lib/stores/stores'
	let backToTraining: boolean = false

	const IE = $trainingValues.iterationError

	if (IE[IE.length - 1] > $trainingValues.maxError!) backToTraining = true

	const hanleClick = () => {
		if (backToTraining) {
			setAppStatusModelMode()
		} else {
			setFetchDataToSimulation()
			setAppStatusSimulationUploadMode()
		}
	}
</script>

<div class="flex flex-col items-center font-bold gap-4">
	<section class="w-full h-full">
		<h3 class=" w-full text-center bg-white">Gráfica de entrenamiento</h3>
		<Chart />
	</section>
	<section class="flex flex-col items-center font-bold">
		<p class="text-cyan-50">
			{$isVisbleSimulation && backToTraining
				? 'El entrenamiento no se completó satisfactoriaente, por favor vuelva a entrenar'
				: 'Ahora que está listo el entrenamiento, puede empezar la simulación'}
		</p>
		<button
			on:click={hanleClick}
			class="text-center bg-blue-500 text-white font-bold w-36 h-10 rounded-md mt-3 mb-4"
		>
			{backToTraining ? 'Volver a entrenar' : 'Simular'}
		</button>
	</section>
</div>
