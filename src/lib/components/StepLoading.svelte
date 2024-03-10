<script lang="ts">
	import { Spinner } from 'flowbite-svelte'
	export let data: string = 'Subiendo el archivo y extrayendo la información...'
</script>

<div class="flex justify-center items-center flex-col gap-y2 pt-20">
	<Spinner />
	<p class=" text-slate-50 opacity-60">{data}</p>
</div>
