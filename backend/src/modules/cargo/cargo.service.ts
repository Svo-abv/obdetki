import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CargoDto } from './dto/cargo.dto';
import { Cargo } from './models/cargo.entity';

@Injectable()
export class CargoService {
    constructor(
        @InjectRepository(Cargo)
        private repositoryCargo: Repository<Cargo>
    ) { }

    async getCargoByBasketRowsSum(basketId: number): Promise<CargoDto[]> {
        return await this.repositoryCargo.createQueryBuilder("c")
            .where(`c."minimalSumm"<(select sum(count*price) from basket_rows as b where b."basketId"=:basketId)`, { basketId: basketId })
            .getMany();

    }

    async getCargoNameById(id: number): Promise<CargoDto> {
        return await this.repositoryCargo.findOne(id);
    }
}
