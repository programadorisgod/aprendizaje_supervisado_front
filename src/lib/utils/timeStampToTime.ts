import type { BusinessDay } from 'lightweight-charts'

export default function timestampToTime(timestamp: number): BusinessDay {
	const date = new Date(timestamp * 1000)
	return {
		year: date.getUTCFullYear(),
		month: date.getUTCMonth() + 1,
		day: date.getUTCDate()
	}
}
