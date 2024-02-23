import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const investmentChange = await prisma.investmentChange.findMany();
	const change = await prisma.change.findMany();
	const investments = await prisma.investment.findMany();

	return { transactions: array, investmentChange, change, investments };
}) satisfies PageServerLoad;

let array = [
	{ type: 1, date: new Date(), amount: 10000, name: 'Duchod' },
	{ type: 2, date: new Date(), amount: 40000, name: 'Hypoteka' }
];
