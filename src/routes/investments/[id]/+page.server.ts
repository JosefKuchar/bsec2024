import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	if (params.id === 'new') {
		return {
			data: {
				id: 0,
				investmentId: 0,
                type: 0,
                frequency: 0,
                amount: 0,
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
	return { data: response! };
}) satisfies PageServerLoad;