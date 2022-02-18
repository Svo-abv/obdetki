import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsDto } from '../products/dto/products.dto';
import { ProductBrandsInput } from './inputs/create-product-brands.input';
import { ProductBrands } from './models/product-brands.entity';

@Injectable()
export class ProductBrandsService {
    constructor(
        @InjectRepository(ProductBrands)
        private productsBrandsRepository: Repository<ProductBrands>) { }

    async getProductBrandsById(id: number): Promise<ProductBrands> {
        return await this.productsBrandsRepository.findOne(id);
    }

    async getProductBrandsByUuid1c(uuid: string): Promise<ProductBrands> {
        return await this.productsBrandsRepository.findOne({ where: { uuid_1c: uuid } });
    }

    async getAllProductsBrands(): Promise<ProductBrands[]> {
        return await this.productsBrandsRepository.find();
    }

    async createProductBrands(data: ProductBrandsInput): Promise<ProductsDto> {
        return await this.productsBrandsRepository.save(data);
    }
}
