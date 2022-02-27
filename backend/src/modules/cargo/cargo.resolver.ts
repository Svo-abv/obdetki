import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BasketService } from '../basket/basket.service';
import { CargoService } from './cargo.service';
import { CargoDto } from './dto/cargo.dto';
import { Cargo } from './models/cargo.entity';

@Resolver(pf => Cargo)
export class CargoResolver {
    constructor(
        private cargoService: CargoService,
        private basketService: BasketService,
    ) { }


    @Query(returns => [CargoDto])
    async getCargoByBasketRowsSum(@Args('userId') userId: number): Promise<CargoDto[]> {

        const basketId = await this.basketService.getBasketByUserId(userId);
        const cargo = await this.cargoService.getCargoByBasketRowsSum(basketId.id);
        if (!cargo) {
            throw new NotFoundException(userId);
        }
        return cargo;
    }
}
