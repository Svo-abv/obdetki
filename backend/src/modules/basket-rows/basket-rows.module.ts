import { Module } from '@nestjs/common';
import { BasketRowsService } from './basket-rows.service';
import { BasketRowsResolver } from './basket-rows.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketRows } from './models/basket-rows.entity';
import { AuthModule } from 'src/utils/auth/auth.module';
import { BasketService } from '../basket/basket.service';
import { Basket } from '../basket/models/basket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketRows, Basket]),
    AuthModule,
  ],
  providers: [BasketRowsService, BasketService, BasketRowsResolver,]
})
export class BasketRowsModule { }
