import { setAppStatusError, setAppStatusUnknowError, setModeSimulationBP } from '$lib/stores/stores'

export const fetchFileBP = async (file: File): Promise<void> => {
	const { VITE_BASE_URL } = import.meta.env

	const formData = new FormData()
	formData.append('file', file)

	try {
		const res = await fetch(`${VITE_BASE_URL}/error-correction/upload-file`, {
			method: 'POST',
			body: formData
		})
		if (!res.ok) {
			setAppStatusError()
			return
		}
		setModeSimulationBP()
	} catch (error) {
		console.log(error)

		setAppStatusUnknowError()
	}
}
