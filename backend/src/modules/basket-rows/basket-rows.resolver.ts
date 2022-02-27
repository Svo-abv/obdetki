import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { BasketService } from '../basket/basket.service';
import { Products } from '../products/models/products.entity';
import { BasketRowsService } from './basket-rows.service';
import { BasketRowsDto } from './dto/basket-rows.dto';
import { BasketRowInput } from './inputs/create-basket-row.input';
import { BasketRows } from './models/basket-rows.entity';

@Resolver(of => BasketRows)
export class BasketRowsResolver {

    constructor(
        private readonly basketRowsService: BasketRowsService,
        private readonly basketService: BasketService,
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
        const basketId = await this.basketService.getBasketByUserId(id);
        const basketRows = await this.basketRowsService.getBasketRowsByBasketId(basketId.id);
        if (!basketRows) {
            throw new NotFoundException(id);
        }
        return basketRows;
    }

    @ResolveField('product', returns => Products)
    async getProductByBasketRowId(@Parent() row: BasketRows) {
        const { id } = row;
        return this.basketRowsService.getProductByBasketRowId(id);
    }

    @Query(returns => BasketRowsDto)
    async getCountsRowsAndSumByUserId(@Args('userId') userId: number,): Promise<BasketRowsDto> {
        const basketId = await this.basketService.getBasketByUserId(userId);
        return this.basketRowsService.getCountsRowsAndSumByUserId(basketId.id);
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => BasketRowsDto)
    async createProductBasketRow(@Args('data') data: BasketRowInput, @Args('userId') userId: number,): Promise<BasketRowsDto> {
        const basketId = await this.basketService.getBasketByUserId(userId);
        return this.basketRowsService.createProductBasketRow(basketId.id, data);
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => BasketRowsDto)
    async deleteProductBasketRowById(@Args('userId') userId: number, @Args('id') id: number): Promise<BasketRowsDto> {
        const basketId = await this.basketService.getBasketByUserId(userId);
        return this.basketRowsService.deleteProductBasketRowById(basketId.id, id);
    }

}
