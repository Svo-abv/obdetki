import { Module } from '@nestjs/common';
import { ProductBrandsService } from './product-brands.service';
import { ProductBrandsResolver } from './product-brands.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrands } from './models/product-brands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductBrands,])],
  providers: [ProductBrandsService, ProductBrandsResolver]
})
export class ProductBrandsModule { }
