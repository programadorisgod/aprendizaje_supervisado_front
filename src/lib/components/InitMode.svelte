<script lang="ts">
	import Button from './shared/Button.svelte'
	import { setModelBackPropagation, setUpoladFileToTrain } from '$lib/stores/stores'

	const MODELS = {
		CORRECTION_OF_ERRORS: 'Correción de errrores',
		BACKPROPAGATION: 'Backpropagation Multicapa'
	}
	const handleClick = (event: CustomEvent): void => {
		
		const target = event.detail.target as HTMLElement
		const text = target.outerText

		setUpoladFileToTrain()
		if (text === MODELS.BACKPROPAGATION) {
			setModelBackPropagation()
		}
	}
</script>

<article class="w-full h-full flex flex-col justify-center items-center gap-12">
	<h3 class="text-white font-bold text-3xl">¿Qué modelo quiere usar?</h3>
	<div class="flex flex-col gap-2 text-white">
		<Button on:click={handleClick} message="Correción de errores" />
		<small class="text-center">ó</small>
		<Button on:click={handleClick} message="Backpropagation Multicapa" />
	</div>
</article>
