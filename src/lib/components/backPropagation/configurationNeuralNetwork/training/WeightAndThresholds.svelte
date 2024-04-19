<script>
	// @ts-nocheck

	import customFetch from '$lib/utils/fecthBackPropagation'

	import { createEventDispatcher, onMount } from 'svelte'
	export let layerValues = []
	console.log(layerValues);
	let data = null
	const distPatch = createEventDispatcher()
	onMount(async () => {
		data = await customFetch(layerValues)
		distPatch('message', data)
	})
</script>

<div class="mt-2 flex gap-4">
	{#if data != null}
		<div class="matrix-container">
			<h2><strong>Pesos</strong></h2>
			{#each data.pesos as layer, index}
				<div class="layer">
					<h3><strong>Capa {index + 1}</strong></h3>
					<div class="matrix-column">
						{#each layer as row}
							<div class="matrix-row">
								<span class="bracket">[</span>
								{#each row as value}
									<span class="value">{value.toFixed(2)}</span>
								{/each}
								<span class="bracket">]</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-col">
			<h2><strong>Umbrales</strong></h2>
			{#each data.umbrales as array, index}
				<div class="array">
					<h3><strong>Capa {index + 1}</strong></h3>
					<div class="row">
						{#each array as value}
							<span class="value">{value}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.row::after {
		content: ']';
		font-weight: 900;
	}
	.row::before {
		content: '[';
		font-weight: 900;
	}
	.matrix-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.layer,
	.array {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
	}

	.matrix-column {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.matrix-row {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.bracket {
		font-size: 1.2rem;
		font-weight: bold;
		margin: 0 0.25rem;
	}

	.value {
		margin: 0 0.25rem;
	}
</style>
