import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoResolver } from './cargo.resolver';

@Module({
  providers: [CargoService, CargoResolver]
})
export class CargoModule { }
