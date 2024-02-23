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

export function frequencyToDays(frequency: Frequency) {
	switch (frequency) {
		case Frequency.OneTime:
			throw new Error('OneTime frequency is not supported');
		case Frequency.Daily:
			return 1;
		case Frequency.Weekly:
			return 7;
		case Frequency.Monthly:
			return 30;
		case Frequency.Yearly:
			return 365;
	}
}
