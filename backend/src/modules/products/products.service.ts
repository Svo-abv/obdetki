import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketRows } from '../basket-rows/models/basket-rows.entity';
import { Products } from './models/products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>) { }

    async getProductById(id: number): Promise<Products> {
        return await this.productRepository.findOne(id);
    }

    async getProductByBasketRow(id: number): Promise<Products> {
        return await this.productRepository.findOne({ where: { basketRows: id } }

        ).then((data) => { console.log(data); return data; });
    }
}
