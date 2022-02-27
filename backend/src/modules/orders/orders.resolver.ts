import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { BasketRowsService } from '../basket-rows/basket-rows.service';
import { BasketService } from '../basket/basket.service';
import { MailService } from '../mail/mail.service';
import { OrdersRowsService } from '../orders-rows/orders-rows.service';
import { OrdersDto } from './dto/orders.dto';
import { CreateOrderInput } from './inputs/create-order.input';
import { Orders } from './models/orders.entity';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {

    constructor(
        private readonly ordersService: OrdersService,
        private readonly basketService: BasketService,
        private readonly ordersRowsService: OrdersRowsService,
        private readonly basketRowsService: BasketRowsService,
        private readonly mailService: MailService
    ) { }

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

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => OrdersDto)
    async createOrder(@Args('data') data: CreateOrderInput): Promise<OrdersDto> {
        try {
            const newOrder = await this.ordersService.createOrder(data);
            const basketId = await this.basketService.getBasketByUserId(data.userId);
            await this.ordersRowsService.copyBasketRowsInOrdersRows(basketId.id, newOrder.id);
            await this.basketRowsService.clearBasket(basketId.id);
            await this.mailService.newOrderToAdmin("bobrant@ya.ru", newOrder.number);
            return newOrder;
        } catch (e) {
            throw new NotFoundException(e);
        }

    }
}
