import { ObjectType, Field } from "@nestjs/graphql";
import { Basket } from "src/modules/basket/models/basket.entity";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'BasketRows' })
export class BasketRows {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    count: number;

    @Column()
    @Field()
    price: number;

    @ManyToOne(() => Basket, basket => basket.id)
    @Field(type => Basket)
    basket: Basket;

    @ManyToOne(() => Products, product => product.id)
    @Field(type => Products)
    product: Products;

}