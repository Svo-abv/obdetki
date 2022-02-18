import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategories } from './models/product-categories.entity';

@Injectable()
export class ProductCategoriesService {
    constructor(
        @InjectRepository(ProductCategories)
        private productCategoriesRepository: Repository<ProductCategories>) { }

    async getProductCategoriesById(id: number): Promise<ProductCategories> {
        return await this.productCategoriesRepository.findOne(id);
    }

    async getProductCategoriesByUuid1c(uuid: string): Promise<ProductCategories> {
        return await this.productCategoriesRepository.findOne({ where: { uuid_1c: uuid } });
    }

    async getAllProductsCategoriesBrands(): Promise<ProductCategories[]> {
        return await this.productCategoriesRepository.find();
    }
}
