import { Module } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { ProductImagesResolver } from './product-images.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages } from './models/product-images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImages]),],
  providers: [ProductImagesService, ProductImagesResolver,]
})
export class ProductImagesModule { }
