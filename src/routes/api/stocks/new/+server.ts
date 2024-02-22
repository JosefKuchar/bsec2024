import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const data = await event.request.json();
	await prisma.investment.create({
		data: {
			...data,
			rate: Number(data.rate),
			min: Number(data.min),
			max: Number(data.max),
			negative: Number(data.negative),
			positive: Number(data.positive),
			neutral: Number(data.neutral)
		}
	});
	return new Response();
};
