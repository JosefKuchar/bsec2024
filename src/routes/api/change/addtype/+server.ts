import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const data = await event.request.json();
	const typeId = parseInt(data.typeId);
	delete data.id;
	delete data.typeId;
	await prisma.changeType.create({
		data: {
			...data,
            label: data.label,
            dir: data.dir
		}
	});
	return new Response();
};
