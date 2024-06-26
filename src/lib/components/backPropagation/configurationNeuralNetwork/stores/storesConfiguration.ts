import { type typeConfiguration } from '$lib/types/configurationNeuralNetwork'
import { writable } from 'svelte/store'

export const trainingFailed = writable<boolean>(false)
export const storeNumberOfLayersHiddens = writable<number>(0)
export const storeFA = writable<Array<string>>([''])
export const storeLayerValues = writable<Array<number>>([0])
export const valuesIterationTraining = writable<valuesIteration>()
export const errorIteration = writable<number>(0)
export const maxErorr = writable<number>(0)
export const configurationNeuralNetwork = writable<typeConfiguration>()
export const simulationStore = writable<number[][]>()
export const databaseStore = writable<number[][]>()
export const valuesStore = writable<[number[], number[]][]>()

export const typeLetter = writable<boolean>(false)

type valuesIteration = {
	error: number[]
	iterations: number
}

export const setTrainingFailed = () => {
	trainingFailed.set(true)
}

export const setNumberOfLayersHiddens = (value: number) => {
	storeNumberOfLayersHiddens.set(value)
}

export const setFA = (value: string[]) => {
	storeFA.set(value)
}

export const setLayerValues = (value: number[]) => {
	storeLayerValues.set(value)
}

export const setMaxError = (value: number) => {
	maxErorr.set(value)
}

export const setIterationsError = (value: number) => {
	errorIteration.set(value)
}

export const setValuesTraining = (value: valuesIteration) => {
	valuesIterationTraining.set(value)
}
export const setConfiguration = (value: typeConfiguration) => {
	configurationNeuralNetwork.set(value)
}
