import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './models/orders.entity';
import { AuthModule } from 'src/utils/auth/auth.module';
import { BasketService } from '../basket/basket.service';
import { Basket } from '../basket/models/basket.entity';
import { OrdersRowsService } from '../orders-rows/orders-rows.service';
import { OrdersRows } from '../orders-rows/models/orders-rows.entity';
import { BasketRowsService } from '../basket-rows/basket-rows.service';
import { BasketRows } from '../basket-rows/models/basket-rows.entity';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { Users } from '../users/models/users.entity';
import { CargoService } from '../cargo/cargo.service';
import { Cargo } from '../cargo/models/cargo.entity';

@Module({
  providers: [OrdersService, OrdersResolver, BasketService,
    OrdersRowsService, BasketRowsService, MailService, UsersService, CargoService],
  imports: [
    TypeOrmModule.forFeature([Orders, Basket, OrdersRows, BasketRows, Users, Cargo]),
    AuthModule, MailModule,
  ]
})
export class OrdersModule { }
