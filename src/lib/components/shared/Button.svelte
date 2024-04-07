<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let message: string
	const dispatch = createEventDispatcher()

	const handleClick = (event: MouseEvent) => {
		dispatch('click', event)
	}
	const handleChange = (event: Event) => {
		dispatch('change', event)
	}
</script>

<button
	on:click={handleClick}
	on:input={handleChange}
	class="cursor-pointer bg-blue-500 text-white font-bold w-60 h-12 rounded-md">{message}</button
>
