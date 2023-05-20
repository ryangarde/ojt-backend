import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule } from 'nestjs-redoc';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.setGlobalPrefix('api');
	// app.useStaticAssets(join(__dirname, '../..', 'public'));
	app.useStaticAssets('public', {
		prefix: '/public/',
	});

	const config = new DocumentBuilder()
		.setTitle('Shopping Cart API')
		// .setDescription('The cats API description')
		.setVersion('1.0')
		.addTag('Auth')
		.addTag('Categories')
		.addTag('Items')
		.addTag('Images')
		.addTag('Cart')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	await RedocModule.setup('/docs', app as any, document, {
		hideHostname: false,
		favicon: '/public/favicon.png',
	});
	// SwaggerModule.setup('docs', app, document);

	await app.listen(process.env.PORT);
}
bootstrap();
