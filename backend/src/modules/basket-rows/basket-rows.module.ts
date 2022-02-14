import { Module } from '@nestjs/common';
import { BasketRowsService } from './basket-rows.service';
import { BasketRowsResolver } from './basket-rows.resolver';

@Module({
  providers: [BasketRowsService, BasketRowsResolver]
})
export class BasketRowsModule { }
