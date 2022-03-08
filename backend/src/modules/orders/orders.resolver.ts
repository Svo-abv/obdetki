import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { UpdateResult } from 'typeorm';
import { BasketRowsService } from '../basket-rows/basket-rows.service';
import { BasketService } from '../basket/basket.service';
import { CargoService } from '../cargo/cargo.service';
import { CargoDto } from '../cargo/dto/cargo.dto';
import { MailService } from '../mail/mail.service';
import { OrdersRows } from '../orders-rows/models/orders-rows.entity';
import { OrdersRowsService } from '../orders-rows/orders-rows.service';
import { UserDto } from '../users/dto/user.dto';
import { Users } from '../users/models/users.entity';
import { UsersService } from '../users/users.service';
import { OrdersDto } from './dto/orders.dto';
import { OrdersUpdateUuid1cDto } from './dto/update-orders';
import { CreateOrderInput } from './inputs/create-order.input';
import { setOrder1CUuidInput } from './inputs/set-order-uuid.input';
import { Orders } from './models/orders.entity';
import { OrdersService } from './orders.service';

@Resolver(of => Orders)
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
        const orders = await this.ordersService.getOrderById(id);
        if (!orders) {
            throw new NotFoundException(id);
        }
        return orders;
    }

    @UseGuards(CheckAuthGuard)
    @Query(returns => [Orders])
    async getOrdersWhithoutUuid1C(): Promise<Orders[]> {
        const order = await this.ordersService.getOrdersWhithoutUuid1C();
        if (!order) {
            throw new NotFoundException();
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

    @ResolveField('ordersRows', returns => [OrdersRows], { nullable: true })
    async getOrderRows(@Parent() order: Orders) {
        const { id } = order;
        return await this.ordersRowsService.getProductsRowsByIdOrder(id);
    }

    @ResolveField('user', returns => UserDto, { nullable: true })
    async getUser(@Parent() order: Orders) {
        const { userId } = order;
        return await this.userService.getUserById(userId);
    }

    @ResolveField('cargo', returns => CargoDto, { nullable: true })
    async getCargo(@Parent() order: Orders) {
        const { cargoId } = order;
        return await this.cargoService.getCargoNameById(cargoId);
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

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => OrdersUpdateUuid1cDto)
    async setOrderUuid1cById(@Args('data') data: setOrder1CUuidInput): Promise<OrdersUpdateUuid1cDto> {
        try {
            return await this.ordersService.setOrderUuid1cById(data);
        } catch (e) {
            throw new NotFoundException(e);
        }

    }
}
