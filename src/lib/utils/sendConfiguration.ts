import { setAppStatusUnknowError } from '$lib/stores/stores'
import type { typeConfiguration } from '$lib/types/configurationNeuralNetwork'

export default async function sendInformationNeuralNetwork(config: typeConfiguration) {
	const { VITE_BASE_URL } = import.meta.env
	const URI = `${VITE_BASE_URL}/backpropagation/config`
	try {
		const res = await fetch(URI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(config)
		})
		if (!res.ok) throw new Error('La petición ha fallado')
		if (res.status === 401) throw new Error('Api key invalida')

		const data = await res.json()
		console.log(data)

		return data
	} catch (error) {
		console.log(error)
		setAppStatusUnknowError()
	}
}
