import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const data = await event.request.json();
	const typeId = parseInt(data.typeId);
	delete data.id;
	delete data.typeId;
	await prisma.change.create({
		data: {
			...data,
			from: new Date(data.from),
			to: new Date(data.to),
			type: {
				connect: {
					id: typeId
				}
			}
		}
	});
	return new Response();
};
