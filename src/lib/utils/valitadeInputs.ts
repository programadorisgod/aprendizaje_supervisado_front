export default function showError(
	valueInputError: number | undefined,
	valueInputRat: number | undefined,
	valueInputIterations: number | undefined
) {
	if (
		valueInputError === undefined ||
		valueInputRat === undefined ||
		valueInputIterations === undefined
	) {
		return true
	} else {
		false
	}
}
