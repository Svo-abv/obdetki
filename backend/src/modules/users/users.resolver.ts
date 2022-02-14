import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BasketService } from '../basket/basket.service';
import { Basket } from '../basket/models/basket.entity';
import { Orders } from '../orders/models/orders.entity';
import { OrdersService } from '../orders/orders.service';
import { Users } from './models/users.entity';
import { UsersService } from './users.service';

@Resolver(of => Users)
export class UsersResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly basketService: BasketService,
        private readonly ordersService: OrdersService,
    ) { }

    @Query(returns => Users)
    async getUserById(@Args('id') id: number): Promise<Users> {

        const user = await this.usersService.getUserById(id);
        if (!user) {
            throw new NotFoundException(id);
        }
        return user;
    }

    @Query(returns => [Users])
    async getAllUsers(): Promise<Users[]> {

        const users = await this.usersService.getAllUsers();
        console.log(users);
        if (!users) {
            throw new NotFoundException();
        }
        return users;
    }

    @ResolveField('basket', returns => Basket, { nullable: true })
    async getBasket(@Parent() user: Users) {
        const { id } = user;
        return this.basketService.getBasketByUserId(id);
    }

    @ResolveField('order', returns => [Orders], { nullable: true })
    async getOrders(@Parent() user: Users) {
        const { id } = user;
        return this.ordersService.getOrdersByUserId(id);
    }
}
