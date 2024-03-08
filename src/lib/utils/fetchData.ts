import { setAppStatusError } from '$lib/stores/stores'

export const fetchFile = async (file: File): Promise<void> => {
	const formData = new FormData()
	formData.append('file', file)

	const res = await fetch('http://0.0.0.0:8000/api/v1/sensors/upload_file', {
		method: 'POST',
		body: formData
	})

	if (!res.ok) {
		setAppStatusError()
		return
	}
	const result = await res.json()
	console.log(result)
}
