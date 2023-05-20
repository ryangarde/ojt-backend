import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PrismaModule } from '@/prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './app/admin/admin.module';
import { AuthModule } from './app/auth/auth.module';
import { PublicModule } from './app/public/public.module';
import { ClientModule } from './app/client/client.module';

@Module({
	imports: [
		// ServeStaticModule.forRoot({
		// 	rootPath: join(__dirname, '..', '/public/'),
		// 	serveStaticOptions: { index: false },
		// 	// exclude: ['/api*'],
		// }),
		AdminModule,
		PrismaModule,
		RouterModule.register([{ path: 'admin', module: AdminModule }]),
		AuthModule,
		PublicModule,
		ClientModule,
		// ServeStaticModule.forRoot({
		// 	rootPath: join(__dirname, '..', 'public'),
		// }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
