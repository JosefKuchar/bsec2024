import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { getFrequencyString } from '$lib/utils';
import moment from 'moment';

export const load = (async () => {
	const investmentChange = await prisma.investmentChange.findMany({
		include : {
            investment : true
        }
	});

	return { investmentChange: investmentChange.map((investment) => ({
		...investment,
		frequency: getFrequencyString(investment.frequency),
		name: investment.investment.name,
		bic: investment.investment.bic,
		to : moment(investment.to).format('DD.MM.YYYY'),
		from : moment(investment.from).format('DD.MM.YYYY')
	}))};
}) satisfies PageServerLoad;