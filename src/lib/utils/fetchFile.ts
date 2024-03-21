import {
	appStatus,
	fetchDataToSimulation,
	setAppStatusError,
	setAppStatusModelMode,
	setAppStatusSimulationMode,
	setAppStatusUnknowError
} from '$lib/stores/stores'
import { get } from 'svelte/store'

export const fetchFile = async (file: File): Promise<void> => {
	const { VITE_BASE_URL } = import.meta.env

	const formData = new FormData()
	formData.append('file', file)

	try {
		const res = await fetch(`${VITE_BASE_URL}/upload_file`, {
			method: 'POST',
			body: formData
		})
		if (!res.ok) {
			setAppStatusError()
			return
		}

		if (get(fetchDataToSimulation)) {
			setAppStatusSimulationMode()
		} else {
			setAppStatusModelMode()
		}
	} catch (error) {
		setAppStatusUnknowError()
	}
}
