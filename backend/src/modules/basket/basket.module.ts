import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketResolver } from './basket.resolver';
import { Basket } from './models/basket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketRowsService } from '../basket-rows/basket-rows.service';
import { BasketRowsModule } from '../basket-rows/basket-rows.module';
import { BasketRows } from '../basket-rows/models/basket-rows.entity';

@Module({
  providers: [BasketService, BasketResolver, BasketRowsService],
  imports: [
    TypeOrmModule.forFeature([Basket]),
    TypeOrmModule.forFeature([BasketRows]),
    BasketRowsModule,
  ],
})
export class BasketModule {

}
