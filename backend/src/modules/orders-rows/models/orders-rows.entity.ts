import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Orders } from "src/modules/orders/models/orders.entity";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'OrdersRows' })
export class OrdersRows {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column({ default: 0 })
    @Field()
    count?: number;

    @Column({ default: 0 })
    @Field()
    price?: number;

    @ManyToOne(() => Orders, order => order.id)
    @Field(type => Orders)
    order?: Orders;

    @ManyToOne(() => Products, product => product.id)
    @Field(type => Products)
    product?: Products;

}