import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { BasketRowsService } from '../basket-rows/basket-rows.service';
import { BasketService } from '../basket/basket.service';
import { CargoService } from '../cargo/cargo.service';
import { MailService } from '../mail/mail.service';
import { OrdersRowsService } from '../orders-rows/orders-rows.service';
import { UsersService } from '../users/users.service';
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
        private readonly mailService: MailService,
        private readonly userService: UsersService,
        private readonly cargoService: CargoService,
    ) { }

    @UseGuards(CheckAuthGuard)
    @Query(returns => Orders)
    async getOrdersById(@Args('id') id: number): Promise<Orders> {
        const order = await this.ordersService.getOrderById(id);
        if (!order) {
            throw new NotFoundException(id);
        }
        return order;
    }

    @UseGuards(CheckAuthGuard)
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

            const user = await this.userService.getUserById(data.userId);
            const rows = await this.ordersRowsService.getProductsRowsByIdOrder(newOrder.id);
            const cargo = await this.cargoService.getCargoNameById(data.cargoId);

            await this.mailService.newOrderToAdmin(newOrder, user, rows, cargo.name, data.comment);
            await this.mailService.newOrderToUser(newOrder, user, rows, cargo.name, data.comment);
            return newOrder;
        } catch (e) {
            throw new NotFoundException(e);
        }

    }
}
