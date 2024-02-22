import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {


	// const flavorOptions: AutocompleteOption<string>[] = [
	// 	{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
	// 	{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
	// 	{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
	// 	{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla', meta: { healthy: false } },
	// 	{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
	// 	{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	// 	];


	const changeTypes = await (await prisma.changeType.findMany()).map((changeType) => {
		return {
			label: changeType.name,
			value: changeType.id.toString(),
		};
	});

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
			},
			changeTypes
		};
	}

	const response = await prisma.change.findFirst({
		where: {
			id: parseInt(params.id)
		}
	});
	return { data: response!, changeTypes};
}) satisfies PageServerLoad;
