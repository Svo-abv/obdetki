import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './models/users.entity';
import { BasketService } from '../basket/basket.service';
import { BasketModule } from '../basket/basket.module';
import { Basket } from '../basket/models/basket.entity';
import { Orders } from '../orders/models/orders.entity';
import { OrdersService } from '../orders/orders.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  providers: [UsersService, UsersResolver, BasketService, OrdersService],
  imports: [
    TypeOrmModule.forFeature([Users, Basket, Orders]),
    BasketModule, OrdersModule
  ]
})
export class UsersModule { }
