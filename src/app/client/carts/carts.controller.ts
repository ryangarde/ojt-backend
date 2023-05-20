import { apiResponse } from '@/common/utils';
import { CartEntity } from '@/entities/cart.entities';
import { PrismaService } from '@/prisma/prisma.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItem, Item } from '@prisma/client';

@ApiTags('Cart')
@Controller('carts')
export class CartsController {
	constructor(private prisma: PrismaService) {}

	@Get()
	@ApiOperation({ summary: "List of users's carts" })
	@ApiResponse({ status: 200, isArray: true, type: CartEntity })
	async index(@Req() req) {
		try {
			const data = await this.prisma.cart.findMany({
				where: {
					user_id: +req.user.id,
				},
				include: {
					items: {
						include: {
							item: true,
						},
					},
				},
			});

			return apiResponse({ data });
		} catch (error) {
			throw apiResponse({ error });
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'View cart' })
	@ApiResponse({ status: 200, type: CartEntity })
	@ApiParam({ name: 'id', example: 1, description: 'Cart ID', type: 'string', required: true })
	async show(@Req() req) {
		try {
			const data = await this.prisma.cart.findFirst({
				where: {
					id: +req.params.id,
				},
				include: {
					items: {
						include: {
							item: true,
						},
					},
				},
			});

			if (!data) {
				throw apiResponse({ message: 'Cart not found', status: 404 });
			}

			return apiResponse({ data });
		} catch (error) {
			throw apiResponse({ error });
		}
	}

	@Post('add-to-cart')
	@ApiOperation({ summary: 'Create cart', description: 'Call this when you want to create a cart then pass an array of item ID' })
	@ApiResponse({ status: 201, type: CartEntity })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				items: {
					type: 'array',
					items: {
						properties: {
							id: { type: 'number', example: 1, description: "Item's ID" },
						},
					},
				},
			},
		},
	})
	async addToCart(@Req() req, @Body('items') items: Item[]) {
		try {
			const data = await this.prisma.cart.create({
				data: {
					user_id: +req.user.id,
					items: {
						create: items.map((i) => ({
							item: {
								connect: { id: i.id },
							},
						})),
					},
				},
				include: {
					items: {
						include: {
							item: true,
						},
					},
				},
			});

			return apiResponse({ data: data });
		} catch (error) {
			console.log(error);
			throw apiResponse({ error });
		}
	}
}
