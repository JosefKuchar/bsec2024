import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const response = await prisma.investment.findFirst({
		where: {
			id: parseInt(params.id)
		}
	});
	return { data: response! };
}) satisfies PageServerLoad;
