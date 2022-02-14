import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BasketRowsService } from '../basket-rows/basket-rows.service';
import { BasketRows } from '../basket-rows/models/basket-rows.entity';
import { BasketService } from './basket.service';
import { Basket } from './models/basket.entity';

@Resolver(of => Basket)
export class BasketResolver {

    constructor(
        private readonly basketService: BasketService,
        private readonly basketRowsService: BasketRowsService,
    ) { }

    @Query(returns => Basket)
    async getBasketById(@Args('id') id: number): Promise<Basket> {

        const basket = await this.basketService.getBasketById(id);
        if (!basket) {
            throw new NotFoundException(id);
        }
        return basket;
    }

    @Query(returns => Basket, { nullable: true })
    async getBasketByUserId(@Args('id') id: number): Promise<Basket> {

        const basket = await this.basketService.getBasketByUserId(id);
        if (!basket) {
            throw new NotFoundException(id);
        }
        return basket;
    }

    @ResolveField('basketRows', returns => [BasketRows], { nullable: true })
    async getBasket(@Parent() basket: Basket) {
        const { id } = basket;
        return this.basketRowsService.getBasketRowsByBasketId(id);
    }

}
