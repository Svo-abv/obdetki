import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRandomNumber } from 'src/utils/functions';
import { Repository } from 'typeorm';
import { OrdersDto } from './dto/orders.dto';
import { CreateOrderInput } from './inputs/create-order.input';
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

    async createOrder(data: CreateOrderInput): Promise<OrdersDto> {
        const newOrder = this.ordersRepository.create(data);
        newOrder.number = getRandomNumber();
        return await this.ordersRepository.save(newOrder);
    }

}
