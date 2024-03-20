import { setAppStatusUnknowError } from '$lib/stores/stores'

export default async function fetchData(params?: string) {
	const { VITE_BASE_URL } = import.meta.env
	try {
		const uri = params ? `${VITE_BASE_URL}/${params}` : VITE_BASE_URL
		const res = await fetch(uri)

		if (!res.ok) {
			setAppStatusUnknowError()
		}

		const data = await res.json()

		return data
	} catch (error) {
		setAppStatusUnknowError()
	}
}
