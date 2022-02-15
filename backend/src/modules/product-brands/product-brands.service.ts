import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBrands } from './models/product-brands.entity';

@Injectable()
export class ProductBrandsService {
    constructor(
        @InjectRepository(ProductBrands)
        private productsBrandsRepository: Repository<ProductBrands>) { }

    async getProductBrandsById(id: number): Promise<ProductBrands> {
        return await this.productsBrandsRepository.findOne(id);
    }

    async getAllProductsBrands(): Promise<ProductBrands[]> {
        return await this.productsBrandsRepository.find();
    }
}
