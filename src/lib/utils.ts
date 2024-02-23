import { Frequency } from './enums';

export function getTodayFormatted(): string {
	const today = new Date();
	return today.toISOString().split('T')[0]; // Formats date as 'YYYY-MM-DD'
}

export function getFrequencyString(frequency: Frequency) {
	switch (frequency) {
		case Frequency.OneTime:
			return 'Jednorázově';
		case Frequency.Daily:
			return 'Denně';
		case Frequency.Weekly:
			return 'Týdně';
		case Frequency.Monthly:
			return 'Měsíčně';
		case Frequency.Yearly:
			return 'Ročně';
	}
}
