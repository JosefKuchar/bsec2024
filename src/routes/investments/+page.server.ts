import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const investmentChange = await prisma.investmentChange.findMany({
		include : {
            investment : true
        }
	});

	return { investmentChange: investmentChange};
}) satisfies PageServerLoad;