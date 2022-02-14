import { Module } from '@nestjs/common';
import { ProductBrandsService } from './product-brands.service';
import { ProductBrandsResolver } from './product-brands.resolver';

@Module({
  providers: [ProductBrandsService, ProductBrandsResolver]
})
export class ProductBrandsModule { }
