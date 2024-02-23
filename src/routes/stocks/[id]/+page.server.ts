import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	if (params.id === 'new') {
		return {
			data: {
				id: 0,
				name: '',
				bic: '',
				isin: '',
				rate: null,
				min: null,
				max: null,
				negative: null,
				positive: null,
				neutral: null
			}
		};
	}

	const response = await prisma.investment.findFirst({
		where: {
			id: parseInt(params.id)
		}
	});
	return { data: response! };
}) satisfies PageServerLoad;
