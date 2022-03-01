import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { OrdersRowsInOrderDto } from './dto/order-rows-in-order.dto';
import { OrdersRows } from './models/orders-rows.entity';

@Injectable()
export class OrdersRowsService {
    constructor(
        @InjectRepository(OrdersRows)
        private repositoryOrdersRows: Repository<OrdersRows>
    ) { }

    async copyBasketRowsInOrdersRows(basketId: number, orderId: number) {
        const result = await getConnection()
            .createQueryBuilder()
            .select(`${orderId} as "orderId", "productId", price, count`)
            .from('basket_rows', '')
            .where(`"basketId" = ${basketId}`)
            .getRawMany();

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(OrdersRows, ["orderId", "productId", 'price', 'count'])
            .values(result)
            .execute();
    }


    async getProductsRowsByIdOrder(orderId: number): Promise<OrdersRows[]> {
        return await this.repositoryOrdersRows.find({ relations: ['product'], where: { orderId: orderId } })
    }
}