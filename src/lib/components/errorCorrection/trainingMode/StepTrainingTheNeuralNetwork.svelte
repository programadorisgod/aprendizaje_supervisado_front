<script lang="ts">
	import Chart from './charts/ChartTraining.svelte'
	import {
		setAppStatusModelMode,
		trainingValues,
		simulationValues,
		setAppStatusSimulationUploadMode,
		setFetchDataToSimulation,
		isVisibleSimulation
	} from '$lib/stores/stores'
	import fetchData from '$lib/utils/fetchData'
	let backToTraining: boolean = false

	const IE = $trainingValues.iterationError

	if (IE[IE.length - 1] > $trainingValues.maxError!) backToTraining = true

	const hanleClick = () => {
		if (backToTraining) {
			setAppStatusModelMode()
		} else {
			setFetchDataToSimulation()
			setAppStatusSimulationUploadMode()
			const body = {
				weights: $simulationValues.weights,
				thresholds: $simulationValues.thresholds
			}
			fetchData('file', body)
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
			{$isVisibleSimulation && backToTraining
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
