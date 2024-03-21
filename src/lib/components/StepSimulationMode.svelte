<script lang="ts">
	import simulation from '$lib/services/simulation/main'
	import { simultaionValues } from '$lib/stores/stores' 
	import { onMount } from 'svelte'

	onMount(async () => {
		const w: number[][] = $simultaionValues.weights
		const u: number[] = $simultaionValues.thresholds

		const simulations = await simulation(w, u)
	})

</script>
