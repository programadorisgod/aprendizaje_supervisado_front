import { setAppStatusUnknowError } from '$lib/stores/stores'

export default async function fecthLetter() {
	const { VITE_BASE_URL } = import.meta.env
	const URI = `${VITE_BASE_URL}/backpropagation/lettering`
	try {
		const res = await fetch(URI)

		if (!res.ok) throw new Error('La petición falló')
		if (res.status === 401) throw new Error('Api key invalida')

		const data = await res.json()

		return data
	} catch (error) {
		console.log(error)
		setAppStatusUnknowError()
	}
}
