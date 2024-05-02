export default async function getJson() {
	const { VITE_BASE_URL } = import.meta.env
	const URI = `${VITE_BASE_URL}/backpropagation/json`
	try {
		const res = await fetch(URI)

		if (!res.ok) throw new Error('La petición falló')
		if (res.status === 401) throw new Error('Api key invalida')

		const data = await res.json()
		console.log(data)

		return data
	} catch (error) {
		console.log(error)
	}
}
