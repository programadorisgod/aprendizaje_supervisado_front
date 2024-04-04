<script lang="ts">
	import type { SelectOptionType } from 'flowbite-svelte'
	import { Select } from 'flowbite-svelte'
	import './configurationNeuralNetworkBP.css'
	import { fade } from 'svelte/transition'
	export let input_params: number[][]
	let numberOfLayersHiddens: SelectOptionType<any>[] = [
		{
			name: 1,
			value: 1
		},
		{
			name: 2,
			value: 2
		},
		{
			name: 3,
			value: 3
		}
	]

	let selectedNumberOfLayersHiddens: number = 0
	let layers: number[]
	let layerValues: number[] = [0, 0, 0]

	$: {
		layers = Array.from({ length: selectedNumberOfLayersHiddens }, (_, i) => i + 1)
		if (selectedNumberOfLayersHiddens !== 0) {
			const currentStep = document.querySelector('.step:not(fade_hidden)')

			const nextStep = currentStep?.nextElementSibling

			nextStep?.classList.remove('fade_hidden')
		}
	}

	const handleInputChange = (event: Event, index: number) => {
		const target = event.target as HTMLInputElement
		layerValues[index] = Number(target.value)
	}
</script>

<article class="w-[300px] h-full mt-5 text-white flex flex-col">
	<div class="step">
		<label for="">
			Seleccione el número de capas ocultas:
			<Select
				bind:value={selectedNumberOfLayersHiddens}
				class="mt-2 w-36 h-10"
				items={numberOfLayersHiddens}
			></Select>
		</label>
	</div>

	<div class="step fade_hidden flex flex-col">
		{#each layers as layer, index (layer)}
			<label transition:fade for="">
				Numero de neuronas de la capa ({layer})
				<input
					class="text-black w-36 h-10 rounded-md outline-none mt-2"
					type="number"
					min={layer === 1 ? input_params[0][0] : 1}
					on:input={(event) => handleInputChange(event, index)}
				/>
			</label>
		{/each}
	</div>
</article>
