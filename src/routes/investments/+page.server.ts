import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { getFrequencyString } from '$lib/utils';

export const load = (async () => {
	const investmentChange = await prisma.investmentChange.findMany({
		include : {
            investment : true
        }
	});

	return { investmentChange: investmentChange.map((investment) => ({
		...investment,
		frequency: getFrequencyString(investment.frequency)
	}))};
}) satisfies PageServerLoad;