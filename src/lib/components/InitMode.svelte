<script>
	import Button from './shared/Button.svelte'
</script>

<article class="w-full h-full flex flex-col justify-center items-center gap-12">
	<h3 class="text-white font-bold text-3xl">¿Qué modelo quiere usar?</h3>
	<div class="flex flex-col gap-2 text-white">
		<Button message="Correción de errrores" />
		<small class="text-center">ó</small>
		<Button message="Backpropagation Multicapa" />
	</div>
</article>
