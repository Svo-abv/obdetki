import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './models/orders.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>) { }

    async getOrderById(id: number): Promise<Orders> {
        return await this.ordersRepository.findOne(id);
    }
    async getOrdersByUserId(id: number): Promise<Orders[]> {
        return await this.ordersRepository.find({ where: { user: id } });
    }
}
