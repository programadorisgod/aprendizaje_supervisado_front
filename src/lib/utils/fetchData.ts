import { setAppStatusUnknowError } from '$lib/stores/stores'

export default async function fetchData(params: string) {
	const { VITE_BASE_URL } = import.meta.env
	try {
		const res = await fetch(`${VITE_BASE_URL}/${params}`)

		if (!res.ok) {
			setAppStatusUnknowError()
		}

		const data = await res.json()

		return data
	} catch (error) {
		setAppStatusUnknowError()
	}
}
