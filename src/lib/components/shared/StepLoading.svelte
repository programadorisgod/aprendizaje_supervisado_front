<script lang="ts">
	import { loadingMessage } from '$lib/stores/stores'
	import { Spinner } from 'flowbite-svelte'
	export let data: string
</script>

<div class="flex justify-center items-center flex-col gap-y2 pt-20">
	<Spinner />
	<p class=" text-slate-50 opacity-60">{$loadingMessage ? $loadingMessage : data}</p>
</div>
