import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Orders } from './models/orders.entity';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {

    constructor(private readonly ordersService: OrdersService) { }

    @Query(returns => Orders)
    async getOrdersById(@Args('id') id: number): Promise<Orders> {

        const order = await this.ordersService.getOrderById(id);
        if (!order) {
            throw new NotFoundException(id);
        }
        return order;
    }

    @Query(returns => [Orders])
    async getOrdersByUserId(@Args('id') id: number): Promise<Orders[]> {

        const orders = await this.ordersService.getOrdersByUserId(id);
        if (!orders) {
            throw new NotFoundException(id);
        }
        return orders;
    }
}
