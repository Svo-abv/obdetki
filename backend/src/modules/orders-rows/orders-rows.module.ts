import { Module } from '@nestjs/common';
import { OrdersRowsService } from './orders-rows.service';
import { OrdersRowsResolver } from './orders-rows.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRows } from './models/orders-rows.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRows])
  ]
  ,
  providers: [OrdersRowsService, OrdersRowsResolver]
})
export class OrdersRowsModule { }
