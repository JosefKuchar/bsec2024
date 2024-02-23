import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async (event) => {
	const data = await event.request.json();
	const id = data.id;
	const investmentId = data.investmentId;
	delete data.id;
	delete data.investmentId;
	await prisma.investmentChange.update({
		where: {
			id: id
		},
		data: {
			...data,
			type: Number(data.type),
			amount: Number(data.amount),
			frequency: Number(data.frequency),
			from: new Date(data.from),
			to: new Date(data.to),
			investment: {
				connect: {
					id: investmentId
				}
			}
		},

	});
	return new Response();
};
