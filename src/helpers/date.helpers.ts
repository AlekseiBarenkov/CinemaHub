export const date = {
	formatFullDate: new Intl.DateTimeFormat('ru', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}),

	getFullDate: (dateStr: string) => {
		if (!dateStr || typeof dateStr !== 'string') {
			return null;
		}

		const dateObj = new Date(dateStr);

		if (dateObj.toString() === 'Invalid Date') {
			return null;
		}

		return date.formatFullDate.format(dateObj);
	}
};
