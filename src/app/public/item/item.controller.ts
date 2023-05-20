import { apiResponse } from '@/common/utils';
import { Public } from '@/decorators/public.decorator';
import { ItemEntity } from '@/entities/item.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Items')
@Public()
@Controller('items')
export class ItemController {
	constructor(private prisma: PrismaService) {}

	@Get()
	@ApiOperation({ summary: 'Public Item List', operationId: 'publicItemList' })
	@ApiResponse({ status: 200, isArray: true, type: ItemEntity })
	@ApiQuery({
		name: 'images',
		example: 'true',
		description: 'Set to true to include images',
		required: false,
	})
	async index() {
		try {
			const data = await this.prisma.item.findMany();

			return apiResponse({ data });
		} catch (error) {
			throw apiResponse({ error });
		}
	}
}
