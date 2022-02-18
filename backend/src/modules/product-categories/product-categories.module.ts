import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesResolver } from './product-categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategories } from './models/product-categories.entity';

@Module({
  providers: [ProductCategoriesService, ProductCategoriesResolver],
  imports: [TypeOrmModule.forFeature([ProductCategories,]),],
})
export class ProductCategoriesModule { }
