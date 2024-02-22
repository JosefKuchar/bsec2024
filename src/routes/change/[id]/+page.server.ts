import { Dir } from '$lib/enums';
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const changeTypes = await (
		await prisma.changeType.findMany()
	).map((changeType) => {
		return {
			label: changeType.name,
			value: changeType.id.toString(),
			dir: changeType.dir
		};
	});

	if (params.id === 'new-income') {
		return {
			data: {
				id: 0,
				amount: null,
				from: null,
				to: null,
				dir: Dir.Incomes,
				frequency: null,
				typeId: null
			},
			changeTypes
		};
	}

	if (params.id === 'new-expense') {
		return {
			data: {
				id: 0,
				amount: null,
				from: null,
				to: null,
				dir: Dir.Expenses,
				frequency: null,
				typeId: null
			},
			changeTypes
		};
	}

	const response = await prisma.change.findFirst({
		where: {
			id: parseInt(params.id)
		}
	});
	return { data: response!, changeTypes };
};
