import { Module } from '@nestjs/common';
import { ProductBrandsService } from './product-brands.service';
import { ProductBrandsResolver } from './product-brands.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrands } from './models/product-brands.entity';
import { AuthModule } from 'src/utils/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductBrands,]),
    AuthModule
  ],
  providers: [ProductBrandsService, ProductBrandsResolver]
})
export class ProductBrandsModule { }
