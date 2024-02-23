import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import moment from 'moment';

export const load = (async ({ params, url }) => {

	if (params.id === 'new') {
        const stockId = url.searchParams.get('stock');
        const stock = await prisma.investment.findFirst({
            where: {
                id: parseInt(stockId!)
            }
        });
		return {
			data: {
				id: 0,
				investmentId: parseInt(stockId!),
                type: 0,
                frequency: 0,
                amount: 0,
                from: new Date(),
                to: new Date(),
                investment: stock
			}
		};
	}

	const response = await prisma.investmentChange.findFirst({
		where: {
			id: parseInt(params.id)
		},
        include : {
            investment : true
        }
	});
	return { data: {...response,
		from: moment(response!.from).format('YYYY-MM-DD'),
		to: moment(response!.to).format('YYYY-MM-DD'),
	}};
}) satisfies PageServerLoad;