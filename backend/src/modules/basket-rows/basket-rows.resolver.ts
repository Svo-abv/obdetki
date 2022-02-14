import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Products } from '../products/models/products.entity';
import { ProductsService } from '../products/products.service';
import { BasketRowsService } from './basket-rows.service';
import { BasketRows } from './models/basket-rows.entity';

@Resolver(of => BasketRows)
export class BasketRowsResolver {

    constructor(
        private readonly basketRowsService: BasketRowsService,
        private readonly productsService: ProductsService,
    ) { }
    @Query(returns => BasketRows)
    async getBasketRowById(@Args('id') id: number): Promise<BasketRows> {

        const basketRow = await this.basketRowsService.getBasketRowById(id);
        if (!basketRow) {
            throw new NotFoundException(id);
        }
        return basketRow;
    }

    @Query(returns => [BasketRows], { nullable: true })
    async getBasketRowsByUserId(@Args('id') id: number): Promise<BasketRows[]> {

        const basketRows = await this.basketRowsService.getBasketRowsByBasketId(id);
        console.log(basketRows);
        if (!basketRows) {
            throw new NotFoundException(id);
        }
        return basketRows;
    }

    @ResolveField('product', returns => Products)
    async getProduct(@Parent() row: BasketRows) {
        const { id } = row;
        return this.basketRowsService.getProductByBasketRowId(id);
    }
}
