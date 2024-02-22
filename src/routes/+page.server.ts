import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {

	return { transactions: array };
}) satisfies PageServerLoad;


let array = [
    {"type" : 1, 
    "date" : new Date(), 
    "amount" : 10000, 
    "name" : "Duchod"},
    {"type" : 2, 
    "date" : new Date(), 
    "amount" : 40000, 
    "name" : "Hypoteka"}]