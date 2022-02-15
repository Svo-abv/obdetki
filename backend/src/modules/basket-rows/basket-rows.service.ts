import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../products/models/products.entity';
import { BasketRows } from './models/basket-rows.entity';

@Injectable()
export class BasketRowsService {
    constructor(
        @InjectRepository(BasketRows)
        private basketRowsRepository: Repository<BasketRows>) { }

    async getBasketRowById(id: number): Promise<BasketRows> {
        return await this.basketRowsRepository.findOne(id);
    }

    async getBasketRowsByBasketId(id: number): Promise<BasketRows[]> {
        return await this.basketRowsRepository.find({ where: { basket: id } });
    }

    async getProductByBasketRowId(id: number): Promise<Products> {
        const { product } = await this.basketRowsRepository.findOne(id, { relations: ["product"] });
        return product;
    }
}
