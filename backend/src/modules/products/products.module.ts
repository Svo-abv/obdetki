import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './models/products.entity';
import { ProductImagesService } from '../product-images/product-images.service';
import { ProductImages } from '../product-images/models/product-images.entity';
import { ProductImagesModule } from '../product-images/product-images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, ProductImages]),
    ProductImagesModule
  ],
  providers: [ProductsService, ProductsResolver, ProductImagesService],
})
export class ProductsModule { }
