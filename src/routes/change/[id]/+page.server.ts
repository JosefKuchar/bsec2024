import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	if (params.id === 'new') {
		return {
			data: {
				id: 0,
				amount: null,
				from: null,
				to: null,
				dir: null,
				frequency: null,
				typeId: null
			}
		};
	}

	const response = await prisma.change.findFirst({
		where: {
			id: parseInt(params.id)
		}
	});
	return { data: response! };
}) satisfies PageServerLoad;
