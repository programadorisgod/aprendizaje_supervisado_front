<script lang="ts">
	import Dropzone from 'svelte-file-dropzone'
	import type FileSelectEventDetail from '$lib/interface/interfaceFilesSelect'
	import { type file } from '$lib/types/file'
	import { APP_STATUS, appStatus, setAppStatusError, setAppStatusLoading } from '$lib/stores/stores'
	import { fetchFileBP } from '$lib/utils/fetchFileBP'

	let files: file = {
		accepted: [],
		rejected: []
	}

	async function handleFilesSelect(e: CustomEvent<FileSelectEventDetail>): Promise<void> {
		const { acceptedFiles, fileRejections } = e.detail
		files.accepted = [...files.accepted, ...acceptedFiles]
		files.rejected = [...files.rejected, ...fileRejections]

		if (files.accepted.length > 0) {
			setAppStatusLoading()
			await fetchFileBP(acceptedFiles[0])
			return
		}
		setAppStatusError()
	}
</script>

<Dropzone
	containerStyles="height:10em; display: flex; align-items:center; justify-content:center; "
	on:drop={handleFilesSelect}
	multiple={false}
	accept=".csv, .txt, .xlsx"
>
	{#if $appStatus === APP_STATUS.INIT}
		<p class="text-slate-500">Arrastra y suelta aquí tu archivo</p>
	{:else}
		<p class="text-slate-500">Arrastra y suelta aquí tu archivo, para empezar con la simulación</p>
	{/if}
</Dropzone>

<ol>
	{#each files.accepted as item}
		<li>{item.name}</li>
	{/each}
</ol>
