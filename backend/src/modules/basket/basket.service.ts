import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket } from './models/basket.entity';

@Injectable()
export class BasketService {
    constructor(
        @InjectRepository(Basket)
        private basketRepository: Repository<Basket>) { }

    async getBasketById(id: number): Promise<Basket> {
        return await this.basketRepository.findOne(id);
    }
    async getBasketByUserId(id: number): Promise<Basket> {
        return await this.basketRepository.findOne({ where: { user: id } });
    }
}
