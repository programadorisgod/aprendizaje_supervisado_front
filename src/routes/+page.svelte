<script>
	import { Alert } from 'flowbite-svelte'
	import { appStatus } from '../lib/stores/stores'
	import { APP_STATUS } from '../lib/stores/stores'
	import StepUpload from '$components/shared/StepUpload.svelte'
	import StepLoading from '$components/shared/StepLoading.svelte'
	import StepModel from '$components/viewParamsInput/StepModel.svelte'
	import StepTrainingTheNeuralNetwork from '$components/errorCorrection/trainingMode/StepTrainingTheNeuralNetwork.svelte'
	import StepSimulationMode from '$components/errorCorrection/simulationMode/StepSimulationMode.svelte'
	import InitMode from '$components/InitMode.svelte'
	import ViewChartTraining from '$components/backPropagation/configurationNeuralNetwork/training/ViewChartTraining.svelte'
</script>

{#if $appStatus === APP_STATUS.INIT}
	<InitMode />
{:else if $appStatus === APP_STATUS.UPLOAD_FILE_TO_TRAIN}
	<StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
	<StepLoading data={'Subiendo el archivo y extrayendo la información...'} />
{:else if $appStatus === APP_STATUS.ERROR}
	<Alert>
		<span class="font-medium">¡Algo ha salido mal!</span>
		Cambie algunas cosas e intente enviarlas nuevamente, por ejemplo que el archivo tenga extension:
		".csv, .txt, .xlsx"
	</Alert>
{:else if $appStatus === APP_STATUS.MODEL_MODE}
	<StepModel />
{:else if $appStatus === APP_STATUS.TRAINING_MODE}
	<StepTrainingTheNeuralNetwork />
{:else if $appStatus === APP_STATUS.UPLOAD_SIMULATION_MODE}
	<StepUpload />
{:else if $appStatus === APP_STATUS.SIMULATION_MODE}
	<StepSimulationMode />
{:else if $appStatus === APP_STATUS.TRAINING_MODE_BP}
	<ViewChartTraining />
{:else}
	<Alert>
		<span class="font-medium">Error</span>
		Este estado de la apliacación no está registrado.
	</Alert>
{/if}
