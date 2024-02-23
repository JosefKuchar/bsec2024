import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const investmentChange = await prisma.investmentChange.findMany();
	const change = await prisma.change.findMany();
	const investments = await prisma.investment.findMany();

	return { investmentChange, change, investments };
}) satisfies PageServerLoad;
