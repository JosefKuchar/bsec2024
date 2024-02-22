import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.investment.findMany({});
	return { stocks: response };
}) satisfies PageServerLoad;
