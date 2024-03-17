<script>
	import '../app.css'
</script>

<div
	class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
></div>
<main class="grid place-content-center mt-16">
	<h1 class="text-6xl opacity-70 font-bold text-center pb-10 text-slate-50">
		Aprendizaje Supervisado
	</h1>
	<section class="container max-w-xl h-64 mx-auto pl-10 mt-9">
		<slot />
	</section>
</main>
