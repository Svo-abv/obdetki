import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPropertiesRowsDto } from './dto/product-properties-rows.dto';
import { ProductPropertiesRowsInput } from './inputs/create-product-property-rows.input';
import { ProductPropertiesRows } from './models/product-properties-rows.entity';

@Injectable()
export class ProductPropertiesRowsService {
    constructor(
        @InjectRepository(ProductPropertiesRows)
        private repositoryProductPropertiesRows: Repository<ProductPropertiesRows>) { }

    async getProductPropertyRowById(id: number): Promise<ProductPropertiesRows> {
        return await this.repositoryProductPropertiesRows.findOne(id);
    }

    async getProductPropertyRowByProductId(id: number): Promise<ProductPropertiesRows[]> {
        return await this.repositoryProductPropertiesRows.find({ where: { productId: id }, relations: ['property'], order: { propertyId: 'ASC' } });
    }

    async getProductPropertyRowByProductIdAndProperyId(productId: number, propertyId: number): Promise<ProductPropertiesRows> {
        return await this.repositoryProductPropertiesRows.findOne({
            where: { productId: productId, propertyId: propertyId },
            relations: ['property'], order: { propertyId: 'ASC' }
        });
    }

    async getAllProductPropertiesRows(): Promise<ProductPropertiesRows[]> {
        return await this.repositoryProductPropertiesRows.find();
    }

    async createProductPropertyRows(data: ProductPropertiesRowsInput): Promise<ProductPropertiesRowsDto> {
        return await this.repositoryProductPropertiesRows.save(data);
    }
}
