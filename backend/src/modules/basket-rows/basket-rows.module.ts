import { Module } from '@nestjs/common';
import { BasketRowsService } from './basket-rows.service';
import { BasketRowsResolver } from './basket-rows.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketRows } from './models/basket-rows.entity';
import { ProductsService } from '../products/products.service';
import { Products } from '../products/models/products.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketRows]),
    TypeOrmModule.forFeature([Products]),
    ProductsModule
  ],
  providers: [BasketRowsService, BasketRowsResolver, ProductsService]
})
export class BasketRowsModule { }
