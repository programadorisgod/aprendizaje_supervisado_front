import type { SelectOptionType } from 'flowbite-svelte'
import { FA } from './functionsActivations'

export const numberOfLayersHiddens: SelectOptionType<unknown>[] = [
	{
		name: 1,
		value: 1
	},
	{
		name: 2,
		value: 2
	},
	{
		name: 3,
		value: 3
	}
]
export const functionOfActivationLayerHiden: SelectOptionType<unknown>[] = [
	{ name: 'Tangente hiperbólica', value: FA.TH },
	{ name: 'Sigmoide', value: FA.SIGMOIDE },
	{ name: 'Seno', value: FA.SENO }
]

export const functionOfActivationLayerOutput: SelectOptionType<unknown>[] = [
	{ name: 'Tangente hiperbólica', value: FA.TH },
	{ name: 'Sigmoide', value: FA.SIGMOIDE },
	{ name: 'Seno', value: FA.SENO },
	{ name: 'Lineal', value: FA.LINEAL }
]

export const algorithmTraining: SelectOptionType<unknown>[] = [
	{ name: 'BackPropagation', value: 'BP' },
	{ name: 'BackPropagation Cascada', value: 'BPC' }
]
