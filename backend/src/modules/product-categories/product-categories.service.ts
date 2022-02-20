import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategoriesDto } from './dto/product-categories.dto';
import { ProductCategoriesInput } from './inputs/create-product-categories.input';
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

    async getAllProductsCategories(): Promise<ProductCategories[]> {
        return await this.productCategoriesRepository.find();
    }

    async getAllRootProductsCategories(): Promise<ProductCategories[]> {
        return await this.productCategoriesRepository.find({ where: { parentId: null }, order: { order: 'ASC' } });
    }

    async getAllChildresnProductsCategoriesByParent(id: number): Promise<ProductCategories[]> {
        return await this.productCategoriesRepository.find({ where: { parentId: id }, order: { order: 'ASC' } });
    }
    async createProductCategories(data: ProductCategoriesInput): Promise<ProductCategoriesDto> {
        return await this.productCategoriesRepository.save(data);
    }
}
