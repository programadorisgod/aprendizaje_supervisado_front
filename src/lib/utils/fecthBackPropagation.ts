export default async function customFetch(body: Array<number>) {
	try {

		const { VITE_BASE_URL } = import.meta.env

		const url = `${VITE_BASE_URL}/backpropagation`

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				layerValues: body
			})
		})

		if (!res.ok) throw new Error('La petición falló')
		if (res.status === 401) throw new Error('Url  equivocada')

		const data = await res.json()
		

		return data
	} catch (error) {
		console.log(error)
	}
}
