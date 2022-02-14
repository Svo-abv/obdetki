import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Products } from './models/products.entity';
import { ProductsService } from './products.service';

@Resolver(of => Products)
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService,
        //private readonly basketRowsService: BasketRowsService,
    ) { }

    @Query(returns => Products)
    async getProducttById(@Args('id') id: number): Promise<Products> {

        const product = await this.productsService.getProductById(id);
        if (!product) {
            throw new NotFoundException(id);
        }
        return product;
    }
    @Query(returns => Products)
    async test(@Args('id') id: number): Promise<Products> {

        const product = await this.productsService.getProductByBasketRow(id);
        if (!product) {
            throw new NotFoundException(id);
        }
        return product;
    }
    // @Query(returns => Basket, { nullable: true })
    // async getBasketByUserId(@Args('id') id: number): Promise<Basket> {

    //     const basket = await this.basketService.getBasketByUserId(id);
    //     if (!basket) {
    //         throw new NotFoundException(id);
    //     }
    //     return basket;
    // }

    // @ResolveField('basketRows', returns => [BasketRows], { nullable: true })
    // async getBasket(@Parent() basket: Basket) {
    //     const { id } = basket;
    //     return this.basketRowsService.getBasketRowsByBasketId(id);
    // }
}
