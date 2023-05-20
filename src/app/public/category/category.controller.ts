import { apiResponse } from '@/common/utils';
import { Public } from '@/decorators/public.decorator';
import { CategoryEntity } from '@/entities/category.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Public()
@Controller('categories')
export class CategoryController {
	constructor(private prisma: PrismaService) {}

	@Get()
	@ApiOperation({ summary: 'Public Category List', operationId: 'publicCategoryList' })
	@ApiResponse({ status: 200, isArray: true, type: CategoryEntity })
	async index() {
		try {
			const data = await this.prisma.category.findMany();

			return apiResponse({ data });
		} catch (error) {
			throw apiResponse({ error });
		}
	}
}
