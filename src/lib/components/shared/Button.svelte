<script lang="ts">
	import { setModelBackPropagation, setUpoladFileToTrain } from '$lib/stores/stores'

	export let message: string
	const MODELS = {
		CORRECTION_OF_ERRORS: 'Correción de errrores',
		BACKPROPAGATION: 'Backpropagation Multicapa'
	}
	const handleClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement
		const text = target.outerText

		setUpoladFileToTrain()
		if (text === MODELS.BACKPROPAGATION) {
			setModelBackPropagation()
		}
	}
</script>

<button
	on:click={handleClick}
	class="cursor-pointer bg-blue-500 text-white font-bold w-60 h-12 rounded-md">{message}</button
>
