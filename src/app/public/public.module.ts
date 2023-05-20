import { Module } from '@nestjs/common';
import { ItemController } from './item/item.controller';
import { CategoryController } from './category/category.controller';

@Module({
	controllers: [ItemController, CategoryController],
})
export class PublicModule {}
