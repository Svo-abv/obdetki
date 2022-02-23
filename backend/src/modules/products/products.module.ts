import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './models/products.entity';
import { ProductImagesService } from '../product-images/product-images.service';
import { ProductImages } from '../product-images/models/product-images.entity';
import { ProductImagesModule } from '../product-images/product-images.module';
import { AuthModule } from 'src/utils/auth/auth.module';
import { ProductPropertiesRowsService } from '../product-properties-rows/product-properties-rows.service';
import { ProductPropertiesRows } from '../product-properties-rows/models/product-properties-rows.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, ProductImages, ProductPropertiesRows]),
    ProductImagesModule, AuthModule
  ],
  providers: [ProductsService, ProductsResolver, ProductImagesService, ProductPropertiesRowsService],
})
export class ProductsModule { }
