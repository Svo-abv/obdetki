import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoResolver } from './cargo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './models/cargo.entity';
import { BasketService } from '../basket/basket.service';
import { Basket } from '../basket/models/basket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cargo, Basket]),
  ],
  providers: [CargoService, CargoResolver, BasketService]
})
export class CargoModule { }
