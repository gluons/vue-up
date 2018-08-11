export default function getErrorMessage(err: any): string {
	if (err.message) {
		return err.message;
	} else {
		return err.toString();
	}
}
