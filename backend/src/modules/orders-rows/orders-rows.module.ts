import { Module } from '@nestjs/common';
import { OrdersRowsService } from './orders-rows.service';
import { OrdersRowsResolver } from './orders-rows.resolver';

@Module({
  providers: [OrdersRowsService, OrdersRowsResolver]
})
export class OrdersRowsModule { }
