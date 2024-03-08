<script>
	import '../app.css'
</script>

<div
	class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
></div>
<main class="grid place-content-center min-h-screen w-screen">
	<h1 class="text-6xl opacity-70 font-bold text-center pb-10 text-slate-50">
		Aprendizaje Supervisado
	</h1>
	<section class="container w-[1000px] max-w-xl h-64 mx-auto">
		<slot />
	</section>
</main>
