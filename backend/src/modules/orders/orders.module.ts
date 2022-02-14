import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './models/orders.entity';

@Module({
  providers: [OrdersService, OrdersResolver],
  imports: [TypeOrmModule.forFeature([Orders])]
})
export class OrdersModule { }
