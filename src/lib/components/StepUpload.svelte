<script lang="ts">
	import Dropzone from 'svelte-file-dropzone'
	import type FileSelectEventDetail from '$lib/interface/interfaceFilesSelect'
	import { type file } from '$lib/types/file'
	import { APP_STATUS, appStatus, setAppStatusError, setAppStatusLoading } from '$lib/stores/stores'
	import { fetchFile } from '$lib/utils/fetchFile'
	
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
			await fetchFile(acceptedFiles[0])
			return
		}
		setAppStatusError()
	}
</script>

<Dropzone on:drop={handleFilesSelect} multiple={false} accept=".csv, .txt, .xlsx">
	{#if $appStatus === APP_STATUS.INIT}
		Arrastra y suelta aquí tu archivo
	{:else}
	  Arrastra y suelta aquí tu archivo, para empezar con la simulación
	{/if}
</Dropzone>

<ol>
	{#each files.accepted as item}
		<li>{item.name}</li>
	{/each}
</ol>
zz