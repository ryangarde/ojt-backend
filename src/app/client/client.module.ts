import { Module } from '@nestjs/common';
import { CartsController } from './carts/carts.controller';

@Module({
  controllers: [CartsController]
})
export class ClientModule {}
