import { BaseController } from '@/app/base/base.controller';
import { apiResponse } from '@/common/utils';
import { ItemEntity, ItemCreatePayload, ItemUpdatePayload } from '@/entities/item.entity';
import { NotFoundEntity } from '@/entities/response.entity';
import { PrismaService } from '@/prisma/prisma.service';
import MakeOptionalExcept from '@/types/make-optional-except';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody, ApiParam, ApiQuery, OmitType, ApiOperation } from '@nestjs/swagger';
import { ItemImage, Item } from '@prisma/client';

@ApiTags('Items')
@Controller('items')
export class ItemController extends BaseController {
	constructor(private prisma: PrismaService) {
		super('item');
	}

	@Get()
	@ApiOperation({ summary: 'Item List' })
	@ApiResponse({ status: 200, isArray: true, type: ItemEntity })
	@ApiQuery({
		name: 'images',
		example: 'true',
		description: 'Set to true to include images',
		required: false,
	})
	index(...args) {
		return super.index.apply(this, args);
	}

	@Post()
	@ApiOperation({ summary: 'Create Item' })
	@ApiBody({ type: ItemCreatePayload })
	@ApiResponse({ status: 201, type: ItemEntity })
	async create(@Body() body: MakeOptionalExcept<Item & { images?: ItemImage[] }, 'name' | 'category_id'>) {
		try {
			const data = await this.prisma.item.create({
				data: {
					...body,
					images: {
						create: body.images,
					},
				},
				include: {
					images: true,
				},
			});

			return apiResponse({ data });
		} catch (error) {
			console.log(error);
			throw apiResponse({ error });
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'View Item' })
	@ApiParam({ name: 'id', example: 1, type: 'string', required: true })
	@ApiQuery({
		name: 'images',
		example: 'true',
		description: 'Set to true to include images',
		required: false,
	})
	@ApiResponse({ status: 200, type: ItemEntity })
	@ApiResponse({ status: 404, type: NotFoundEntity })
	show(...args) {
		return super.show.apply(this, args);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update Item' })
	@ApiParam({ name: 'id', example: 1, type: 'string', required: true })
	@ApiBody({ type: ItemUpdatePayload })
	@ApiResponse({ status: 200, type: ItemEntity })
	@ApiResponse({ status: 404, type: NotFoundEntity })
	async update(@Param('id') id, @Body() body: MakeOptionalExcept<Item & { images?: ItemImage[] }, 'name' | 'category_id'>) {
		try {
			const data = await this.prisma.item.update({
				where: {
					id: +id,
				},
				data: {
					...body,
					images: {
						updateMany: body.images?.map((img) => ({
							data: img,
							where: {
								id: img.id,
							},
						})),
					},
				},
				include: {
					images: true,
				},
			});

			return apiResponse({ data });
		} catch (error) {
			console.log(error);
			throw apiResponse({ error });
		}
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete Item' })
	@ApiParam({ name: 'id', example: 1, type: 'string', required: true })
	@ApiResponse({ status: 200, type: OmitType(ItemEntity, []) })
	@ApiResponse({ status: 404, type: NotFoundEntity })
	async delete(...args) {
		return super.delete.apply(this, args);
	}
}
