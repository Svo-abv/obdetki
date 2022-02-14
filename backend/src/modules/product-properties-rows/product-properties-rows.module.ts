import { Module } from '@nestjs/common';
import { ProductPropertiesRowsService } from './product-properties-rows.service';
import { ProductPropertiesRowsResolver } from './product-properties-rows.resolver';

@Module({
  providers: [ProductPropertiesRowsService, ProductPropertiesRowsResolver]
})
export class ProductPropertiesRowsModule { }
