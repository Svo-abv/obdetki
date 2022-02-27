import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../products/models/products.entity';
import { BasketRowsDto } from './dto/basket-rows.dto';
import { BasketRowInput } from './inputs/create-basket-row.input';
import { BasketRows } from './models/basket-rows.entity';

@Injectable()
export class BasketRowsService {
    constructor(
        @InjectRepository(BasketRows)
        private basketRowsRepository: Repository<BasketRows>) { }

    async getBasketRowById(id: number): Promise<BasketRows> {
        return await this.basketRowsRepository.findOne(id);
    }

    async getBasketRowsByBasketId(id: number): Promise<BasketRows[]> {
        return await this.basketRowsRepository.find({ where: { basketId: id } });
    }

    async getProductByBasketRowId(id: number): Promise<Products> {
        const { product } = await this.basketRowsRepository.findOne(id, { relations: ["product"] });
        return product;
    }

    async createProductBasketRow(basketId: number, data: BasketRowInput): Promise<BasketRowsDto> {
        const newRow = this.basketRowsRepository.create(data);
        newRow.basketId = basketId;
        const saved = await this.basketRowsRepository.save(newRow);
        const count = await this.basketRowsRepository.count({ where: { basketId: basketId } });
        return { id: saved.id, count: count }
    }

    async deleteProductBasketRowById(basketId: number, id: number): Promise<BasketRowsDto> {
        await this.basketRowsRepository.remove({ id });
        const count = await this.basketRowsRepository.createQueryBuilder("r")
            .select("count(*) as count, sum(r.price*r.count) as sum")
            .where(`r."basketId" = :basketId`, { basketId: basketId })
            .getRawOne();
        return count;
    }

    async clearBasket(basketId: number): Promise<any> {
        return await this.basketRowsRepository
            .createQueryBuilder()
            .delete()
            .from(BasketRows)
            .where(`basketId= ${basketId}`)
            .execute();
    }

    async getCountsRowsAndSumByUserId(basketId: number): Promise<BasketRowsDto> {
        //const count = await this.basketRowsRepository.count({ where: { basketId: basketId } });
        const count = await this.basketRowsRepository.createQueryBuilder("r")
            .select("count(*) as count, sum(r.price*r.count) as sum")
            .where(`r."basketId" = :basketId`, { basketId: basketId })
            .getRawOne();
        return count;
    }

}
