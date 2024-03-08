<script lang="ts">
	import Dropzone from 'svelte-file-dropzone'
	import type FileSelectEventDetail from '$lib/interface/interfaceFilesSelect'
	import { type file } from '$lib/types/file'
	import { setAppStatusError, setAppStatusLoading, setAppStatusModelMode } from '$lib/stores/stores'
	import { fetchFile } from '$lib/utils/fetchData'
    

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
			fetchFile(acceptedFiles[0])
			setAppStatusModelMode()
		}
	}
</script>

<Dropzone on:drop={handleFilesSelect} multiple={false} accept=".csv, .json, .txt, .xlsx">
	Arrastra y suelta aquí tu archivo
</Dropzone>
<ol>
	{#each files.accepted as item}
		<li>{item.name}</li>
	{/each}
</ol>
