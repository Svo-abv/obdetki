import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketRows } from '../basket-rows/models/basket-rows.entity';
import { ProductBrands } from '../product-brands/models/product-brands.entity';
import { Products } from './models/products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>) { }

    async getProductById(id: number): Promise<Products> {
        return await this.productRepository.findOne(id);
    }

    async getAllProducts(): Promise<Products[]> {
        return await this.productRepository.find();
    }

    async getBrandByProductId(id: number): Promise<ProductBrands> {
        const { productBrands } = await this.productRepository.findOne(id, { relations: ["productBrands"] });
        return productBrands;
    }

    async getCategoryByProductId(id: number): Promise<ProductBrands> {
        const { productCategories } = await this.productRepository.findOne(id, { relations: ["productCategories"] });
        return productCategories;
    }
}
