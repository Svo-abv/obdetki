import { Orders } from "src/modules/orders/models/orders.entity";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrdersRows {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count: number;

    @Column()
    price: number;

    @ManyToOne(type => Orders, order => order.id)
    order: Orders;

    @ManyToOne(type => Products, product => product.id)
    product: Products;

}