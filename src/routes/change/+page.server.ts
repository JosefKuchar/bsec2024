import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { Dir } from '$lib/enums';

export const load = (async () => {
	const incomes = await prisma.change.findMany({
		where : {
            dir : Dir.Incomes,
        },
        include : {
            type : true
        }
	});
    const expenses = await prisma.change.findMany({
        where : {
            dir : Dir.Expenses,
        },
        include : {
            type : true
        }
    });
    console.log(incomes);
    // console.log(expenses);
	return { incomes , expenses};
}) satisfies PageServerLoad;
