import { PrismaClient } from '@prisma/client';
import csvtojson from 'csvtojson';

const prisma = new PrismaClient();

async function main() {
	await csvtojson()
		.fromFile('data/data_clean.csv')
		.then((json) => {
			// Insert data into the database
			json.forEach(async (row) => {
				await prisma.investment.create({
					data: {
						name: row.name,
						bic: row.bic,
						isin: row.isin,
						rate: parseFloat(row.kurz),
						min: parseFloat(row.min),
						max: parseFloat(row.max),
						negative: parseFloat(row.negative),
						neutral: parseFloat(row.neutral),
						positive: parseFloat(row.positive)
					}
				});
			});
		});


		await prisma.changeType.create({
			data: {
				name: "Důchod",
				dir: 2
			}
		});

		await prisma.changeType.create({
			data: {
				name: "Práce",
				dir: 1
			}
		});

		await prisma.changeType.create({
			data: {
				name: "Jídlo",
				dir: 2
			}
		});


		//  hardocoded data
		await prisma.change.create({
			data: {
				amount : 1,
				from : new Date(),
				to : new Date(),
				dir : 1,
				frequency : 1,
				typeId : 1
			}
		});

		await prisma.change.create({
			data: {
				amount : 1,
				from : new Date(),
				to : new Date(),
				dir : 1,
				frequency : 1,
				typeId : 2
			}
		});

		await prisma.change.create({
			data: {
				amount : 1,
				from : new Date(),
				to : new Date(),
				dir : 2,
				frequency : 1,
				typeId : 2
			}
		});

		await prisma.investmentChange.create({
			data: {
				type: 1,
				investmentId : 1,
				amount : 15,
				frequency : 1,
			}
		});

		await prisma.investmentChange.create({
			data: {
				type: 1,
				investmentId : 10,
				amount : 10,
				frequency : 2,
			}
		});
	}



main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
