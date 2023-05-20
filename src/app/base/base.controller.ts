import { apiResponse } from '@/common/utils';
import { ItemEntity } from '@/entities/item.entity';
import { Body, Controller, Delete, ExecutionContext, Get, Param, Patch, Post, Query, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Prisma, PrismaClient, Item } from '@prisma/client';

const prisma = new PrismaClient();

type Schema = keyof typeof prisma;
type Model = Prisma.ItemDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

// const SwaggerResponse = createParamDecorator(
// 	(data: unknown, ctx: ExecutionContext) => {
// 		console.log(ctx)
// 	//   const request = ctx.switchToHttp().getRequest();
// 	//   return request.user;
// 	return ''
// 	},
//   );

@Controller()
export abstract class BaseController {
	constructor(private model?: Schema) {}

	@Get()
	@ApiResponse({ status: 200, type: ItemEntity })
	async index(@Query() query) {
		const transformedQuery = {};
		Object.keys(query).map((key) => {
			if (key === 'true') {
				transformedQuery[key] = true;
			} else if (key === 'false') {
				transformedQuery[key] = false;
			} else {
				transformedQuery[key] = query[key];
			}
		});

		try {
			const data = await (prisma[this.model] as Model).findMany({
				orderBy: { created_at: 'asc' },
				...(Object.keys(query).length > 0 ? { include: transformedQuery } : {}),
			});

			return apiResponse({ data });
		} catch (error) {
			console.log(error);
			throw apiResponse({ error });
		}
	}

	@Post()
	async create(@Body() body) {
		try {
			const data = await (prisma[this.model] as Model).create({
				data: body,
			});

			return apiResponse({ data });
		} catch (error) {
			throw apiResponse({ error });
		}
	}

	@Get('/:id')
	async show(@Query() query, @Param('id') id) {
		const transformedQuery = {};
		Object.keys(query).map((key) => {
			if (key === 'true') {
				transformedQuery[key] = true;
			} else if (key === 'false') {
				transformedQuery[key] = false;
			} else {
				transformedQuery[key] = query[key];
			}
		});

		try {
			const data = await (prisma[this.model] as Model).findFirst({
				where: {
					id: +id,
				},
				...(Object.keys(query).length > 0 ? { include: transformedQuery } : {}),
			});

			if (!data) {
				throw apiResponse({
					message: 'Not found',
					status: 404,
				});
			}

			return apiResponse({ data });
		} catch (error) {
			throw apiResponse({ error });
		}
	}

	@Patch('/:id')
	async update(@Param('id') id, @Body() body) {
		try {
			const data = await (prisma[this.model] as Model).update({
				where: {
					id: +id,
				},
				data: { ...body, updated_at: new Date() },
			});

			if (!data) {
				throw apiResponse({
					message: 'Not found',
					status: 404,
				});
			}

			return apiResponse({ data });
		} catch (error) {
			throw apiResponse({ error });
		}
	}

	@Delete('/:id')
	async delete(@Param('id') id) {
		try {
			const data = await (prisma[this.model] as Model).delete({
				where: {
					id: +id,
				},
			});

			return apiResponse({ data });
		} catch (error) {
			console.log(error);
			throw apiResponse({ error });
		}
	}
}
