import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketResolver } from './basket.resolver';

@Module({
  providers: [BasketService, BasketResolver]
})
export class BasketModule { }
