import { Module } from '@nestjs/common';
import { ItemController } from './item/item.controller';
import { CategoryController } from './category/category.controller';
import { ImagesController } from './images/images.controller';
import { MulterModule } from '@nestjs/platform-express';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
	controllers: [ItemController, CategoryController, ImagesController],
	imports: [
		MulterModule.register({
			dest: '../public/uploads',
			storage: diskStorage({
				destination: function (req, file, cb) {
					let path = `./public/uploads/`;
					mkdirSync(path, { recursive: true });
					cb(null, path);
				},
				filename: function (req, file, cb) {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
				},
			}),
		}),
	],
})
export class AdminModule {}
