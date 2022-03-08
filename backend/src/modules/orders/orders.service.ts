import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRandomNumber } from 'src/utils/functions';
import { Repository, UpdateResult } from 'typeorm';
import { OrdersDto } from './dto/orders.dto';
import { OrdersUpdateUuid1cDto } from './dto/update-orders';
import { CreateOrderInput } from './inputs/create-order.input';
import { setOrder1CUuidInput } from './inputs/set-order-uuid.input';
import { Orders } from './models/orders.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>) { }

    async getOrderById(id: number): Promise<Orders> {
        return await this.ordersRepository.findOne(id);
    }

    async getOrdersWhithoutUuid1C(): Promise<Orders[]> {
        return await this.ordersRepository.find({ where: { uuid_1c: null } });
    }

    async getOrdersByUserId(id: number): Promise<Orders[]> {
        return await this.ordersRepository.find({ where: { user: id } });
    }

    async createOrder(data: CreateOrderInput): Promise<OrdersDto> {
        const newOrder = this.ordersRepository.create(data);
        newOrder.number = getRandomNumber();
        return await this.ordersRepository.save(newOrder);
    }

    async setOrderUuid1cById(data: setOrder1CUuidInput): Promise<OrdersUpdateUuid1cDto> {
        return await this.ordersRepository.update({ id: data.id }, { uuid_1c: data.uuid_1c });
    }

}
