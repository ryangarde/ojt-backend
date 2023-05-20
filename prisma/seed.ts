import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const load = async () => {
	try {
		const genSalt = await bcrypt.genSalt(10);
		const password: string = await bcrypt.hash('123456', genSalt);

		await prisma.role.create({
			data: {
				name: 'admin',
				user: {
					create: {
						name: 'Admin',
						email: 'admin@gmail.com',
						password,
					},
				},
			},
		});

		await prisma.role.create({
			data: {
				name: 'user',
			},
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
};

load();
