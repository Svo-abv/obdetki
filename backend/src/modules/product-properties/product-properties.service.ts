import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPropertiesDto } from './dto/product-properties.dto';
import { ProductPropertiesInput } from './inputs/create-product-propery.input';
import { ProductProperties } from './models/product-properties.entity';

@Injectable()
export class ProductPropertiesService {

    constructor(
        @InjectRepository(ProductProperties)
        private repositoryProductsProperties: Repository<ProductProperties>) { }

    async getProductPropertyById(id: number): Promise<ProductProperties> {
        return await this.repositoryProductsProperties.findOne(id);
    }

    async getProductPropertyByName(name: string): Promise<ProductProperties> {
        return await this.repositoryProductsProperties.findOne({ where: { name: name } });
    }

    async getAllProductProperties(): Promise<ProductProperties[]> {
        return await this.repositoryProductsProperties.find();
    }

    async createProductProperty(data: ProductPropertiesInput): Promise<ProductPropertiesDto> {
        return await this.repositoryProductsProperties.save(data);
    }
}
