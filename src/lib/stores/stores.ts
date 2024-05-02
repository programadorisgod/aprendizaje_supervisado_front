import type { SimulationValues } from '$lib/types/simulationValues'
import type { TrainingValues } from '$lib/types/trainingValuestype'
import { writable } from 'svelte/store'

export const APP_STATUS = {
	INIT: 0,
	LOADING: 1,
	MODEL_MODE: 2,
	TRAINING_MODE: 3,
	UPLOAD_SIMULATION_MODE: 4,
	SIMULATION_MODE: 5,
	UPLOAD_FILE_TO_TRAIN: 6,
	TRAINING_MODE_BP: 7,
	SIMULATION_MODE_BP: 8,
	UPLOAD_SIMULATION_MODE_BP: 9,
	ERROR: -1
}
export const tv: TrainingValues = {
	iterations: 0,
	iterationError: [],
	maxError: 0
}

export const sm: SimulationValues = {
	weights: [[]],
	thresholds: []
}

export const appStatus = writable(APP_STATUS.INIT)
export const loadingMessage = writable('')
export const trainingValues = writable(tv)
export const isVisibleSimulation = writable<boolean>(false)
export const simulationValues = writable(sm)
export const fetchDataToSimulation = writable<boolean>(false)
export const modelBackPropagation = writable<boolean>(false)

export const setAppInitMode = () => {
	appStatus.set(APP_STATUS.INIT)
}
export const setUpoladFileToTrain = () => {
	appStatus.set(APP_STATUS.UPLOAD_FILE_TO_TRAIN)
}
export const setUPloadFileToSimulationBP = () => {
	appStatus.set(APP_STATUS.UPLOAD_SIMULATION_MODE_BP)
}
export const setAppStatusError = () => {
	appStatus.set(APP_STATUS.ERROR)
}

export const setModelBackPropagation = () => {
	modelBackPropagation.set(true)
}
export const setModeSimulationBP = () => {
	appStatus.set(APP_STATUS.SIMULATION_MODE_BP)
}
export const setAppStatusLoading = (message?: string) => {
	appStatus.set(APP_STATUS.LOADING)

	if (message) {
		loadingMessage.set(message)
	}
}

export const setAppStatusModelMode = () => {
	appStatus.set(APP_STATUS.MODEL_MODE)
}

export const setAppStatusTrainingMode = (tv: TrainingValues, maxError: number) => {
	appStatus.set(APP_STATUS.TRAINING_MODE)
	if (tv) {
		trainingValues.set({
			iterations: tv.iterations,
			iterationError: tv.iterationError,
			maxError
		})
	}
}

export const setIsvisibleSimulation = () => {
	isVisibleSimulation.set(true)
}
export const setSimulationValues = (sv: SimulationValues) => {
	simulationValues.set(sv)
}

export const setAppStatusSimulationUploadMode = () => {
	appStatus.set(APP_STATUS.UPLOAD_SIMULATION_MODE)
}
export const setAppStatusSimulationMode = () => {
	appStatus.set(APP_STATUS.SIMULATION_MODE)
}
export const setAppStatusUnknowError = () => {
	appStatus.set(-2)
}

export const setFetchDataToSimulation = () => {
	fetchDataToSimulation.set(true)
}
export const setAppStatusTrainingModeBP = () => {
	appStatus.set(7)
}
