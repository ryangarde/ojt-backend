import { apiResponse } from '@/common/utils';
import { ItemImageEntity } from '@/entities/image.entity';
import { NotFoundEntity } from '@/entities/response.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { Bind, Body, Controller, Delete, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, PickType } from '@nestjs/swagger';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
	constructor(private prisma: PrismaService) {}

	@Post()
	@UseInterceptors(FileInterceptor('name'))
	@Bind(UploadedFile())
	@ApiOperation({ summary: 'Add Image to Item' })
	@ApiResponse({ status: 201, type: ItemImageEntity })
	@ApiBody({ type: PickType(ItemImageEntity, ['name']) })
	async index(file, @Body() body) {
		try {
			const data = await this.prisma.itemImage.create({
				data: {
					name: file.path,
					item_id: +body.item_id,
				},
			});
			return apiResponse({ data });
		} catch (error) {
			throw apiResponse({ error });
		}
	}

	@Patch('/:id')
	@UseInterceptors(FileInterceptor('name'))
	@Bind(UploadedFile())
	@ApiOperation({ summary: 'Update Image' })
	@ApiParam({ name: 'id', example: 1, type: 'string', required: true })
	@ApiResponse({ status: 200, type: ItemImageEntity })
	@ApiResponse({ status: 404, type: NotFoundEntity })
	@ApiBody({ type: PickType(ItemImageEntity, ['name']) })
	async update(@Param('id') id, @Body() body) {
		try {
			const data = this.prisma.itemImage.update({
				where: { id: +id },
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

	@Delete(':id')
	@ApiOperation({ summary: 'Delete Image' })
	@ApiParam({ name: 'id', example: 1, type: 'string', required: true })
	@ApiResponse({ status: 200, type: ItemImageEntity })
	@ApiResponse({ status: 404, type: NotFoundEntity })
	async delete(@Param('id') id) {
		try {
			const data = await this.prisma.itemImage.delete({
				where: {
					id: +id,
				},
			});

			return apiResponse({ data });
		} catch (error) {
			throw apiResponse({ error });
		}
	}
}
