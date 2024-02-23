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
				name: "Nájem",
				dir: 2
			}
		});

		await prisma.changeType.create({
			data: {
				name: "Hypotéka",
				dir: 2
			}
		});

		await prisma.changeType.create({
			data: {
				name: "Mzda",
				dir: 1
			}
		});

		await prisma.changeType.create({
			data: {
				name: "Jídlo",
				dir: 2
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
