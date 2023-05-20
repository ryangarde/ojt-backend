import { BaseController } from '@/app/base/base.controller';
import { CategoryEntity } from '@/entities/category.entity';
import { NotFoundEntity } from '@/entities/response.entity';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, PickType, ApiParam } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController extends BaseController {
	constructor() {
		super('category');
	}

	@Get()
	@ApiOperation({ summary: 'Category List' })
	@ApiResponse({ status: 200, isArray: true, type: CategoryEntity })
	index(...args) {
		return super.index.apply(this, args);
	}

	@Get(':id')
	@ApiOperation({ summary: 'View Item' })
	@ApiParam({ name: 'id', example: 1, type: 'string', required: true })
	@ApiResponse({ status: 200, type: CategoryEntity })
	@ApiResponse({ status: 404, type: NotFoundEntity })
	show(...args) {
		return super.show.apply(this, args);
	}

	@Post()
	@ApiOperation({ summary: 'Create Item' })
	@ApiResponse({ status: 201, type: CategoryEntity })
	@ApiBody({ type: PickType(CategoryEntity, ['name']) })
	create(...args) {
		return super.create.apply(this, args);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update Item' })
	@ApiParam({ name: 'id', example: 1, type: 'string', required: true })
	@ApiResponse({ status: 200, type: CategoryEntity })
	@ApiResponse({ status: 404, type: NotFoundEntity })
	@ApiBody({ type: PickType(CategoryEntity, ['name']) })
	update(...args) {
		return super.update.apply(this, args);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete Item' })
	@ApiParam({ name: 'id', example: 1, type: 'string', required: true })
	@ApiResponse({ status: 200, type: CategoryEntity })
	@ApiResponse({ status: 404, type: NotFoundEntity })
	async delete(...args) {
		return super.delete.apply(this, args);
	}
}
