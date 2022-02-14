import { Module } from '@nestjs/common';
import { ProductPropertiesService } from './product-properties.service';
import { ProductPropertiesResolver } from './product-properties.resolver';

@Module({
  providers: [ProductPropertiesService, ProductPropertiesResolver]
})
export class ProductPropertiesModule { }
