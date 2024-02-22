import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { Dir } from '$lib/enums';
import { getFrequencyString } from '$lib/utils';

export const load = (async () => {
	const incomes = await prisma.change.findMany({
		where: {
			dir: Dir.Incomes
		},
		include: {
			type: true
		}
	});
	const expenses = await prisma.change.findMany({
		where: {
			dir: Dir.Expenses
		},
		include: {
			type: true
		}
	});
	return {
		incomes: incomes.map((income) => ({
			...income,
			frequency: getFrequencyString(income.frequency)
		})),
		expenses: expenses.map((expense) => ({
			...expense,
			frequency: getFrequencyString(expense.frequency)
		}))
	};
}) satisfies PageServerLoad;
