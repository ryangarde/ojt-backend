import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { apiResponse } from '@/common/utils';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async validateUser(username: string, pass: string) {
		const user = await this.prisma.user.findFirst({ where: { email: username }, include: { role: true } });

		if (!user) {
			throw apiResponse({
				message: 'User not found',
				status: 404,
			});
		}

		const validPassword = await bcrypt.compare(pass, user.password);

		if (!validPassword) {
			throw apiResponse({
				message: 'Incorrect password',
				status: 400,
			});
		}

		if (user && validPassword) {
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

	async login(payload: any) {
		try {
			const user = await this.validateUser(payload.email, payload.password);

			return {
				user: {
					email: user.email,
					name: user.name,
					role: user.role.name,
					created_at: user.created_at,
					updated_at: user.updated_at,
				},
				access_token: this.jwtService.sign(user, {
					expiresIn: '8h',
					secret: jwtConstants.secret,
				}),
			};
		} catch (err) {
			throw err;
		}
	}

	async register(payload: any) {
		try {
			const genSalt = await bcrypt.genSalt(10);
			const password: string = await bcrypt.hash(payload.password, genSalt);

			const user = await this.prisma.user.findFirst({ where: { email: payload.email }, include: { role: true } });
			if (!!user) {
				throw apiResponse({
					message: 'User already exists',
					status: 400,
				});
			}

			const response = await this.prisma.user.create({
				data: {
					...payload,
					password,
					role_id: 2,
				},
				include: {
					role: true,
				},
			});

			return {
				user: {
					email: response.email,
					name: response.name,
					role: response.role.name,
					created_at: response.created_at,
					updated_at: response.updated_at,
				},
				access_token: this.jwtService.sign(response, {
					expiresIn: '8h',
					secret: jwtConstants.secret,
				}),
			};
		} catch (err) {
			throw err;
		}
	}
}
