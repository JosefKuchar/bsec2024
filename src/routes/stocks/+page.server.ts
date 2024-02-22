import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.investment.findMany({
		orderBy: {
			name: 'asc'
		}
	});
	return { stocks: response };
}) satisfies PageServerLoad;
