import { Module } from '@nestjs/common';
import { BasketRowsService } from './basket-rows.service';
import { BasketRowsResolver } from './basket-rows.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketRows } from './models/basket-rows.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketRows]),
  ],
  providers: [BasketRowsService, BasketRowsResolver,]
})
export class BasketRowsModule { }
