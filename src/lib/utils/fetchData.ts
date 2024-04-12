import type { SimulationValues } from './../types/simulationValues'
import { setAppStatusUnknowError } from '$lib/stores/stores'

export default async function fetchData(params?: string, body?: SimulationValues) {
	const { VITE_BASE_URL } = import.meta.env

	try {
		const uri = params
			? `${VITE_BASE_URL}/error-correction/${params}`
			: `${VITE_BASE_URL}/error-correction`
		const res = await fetch(uri, {
			method: body ? 'POST' : 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : undefined
		})

		if (!res.ok) {
			setAppStatusUnknowError()
		}

		const data = await res.json()

		return data
	} catch (error) {

		setAppStatusUnknowError()
	}
}
