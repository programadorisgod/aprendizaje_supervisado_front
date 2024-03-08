<script>
	import { Alert } from 'flowbite-svelte'
	import { appStatus } from '../lib/stores/stores'
	import { APP_STATUS } from '../lib/stores/stores'
	import StepUpload from '$components/StepUpload.svelte'
	import StepLoading from '$components/StepLoading.svelte'
	import StepModel from '$components/StepModel.svelte'
</script>

{#if $appStatus === APP_STATUS.INIT}
	<StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
	<StepLoading />
{:else if $appStatus === APP_STATUS.ERROR}
	<Alert>
		<span class="font-medium">¡Algo ha salido mal!</span>
		Cambie algunas cosas e intente enviarlas nuevamente.
	</Alert>
{:else if $appStatus === APP_STATUS.MODEL_MODE}
	<StepModel />
{:else}
	<Alert>
		<span class="font-medium">Error</span>
		Este estado de la apliacación no está soportado.
	</Alert>
{/if}
