import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Basket } from "src/modules/basket/models/basket.entity";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'BasketRows' })
export class BasketRows {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id?: number;

    @Column({ default: 0 })
    @Field()
    count?: number;

    @Column({ default: 0 })
    @Field()
    price?: number;

    @Column({ default: null })
    @Field({ nullable: true })
    productId?: number;

    @Column({ default: null })
    @Field({ nullable: true })
    basketId?: number;

    @ManyToOne(() => Basket, basket => basket.id)
    @Field(type => Basket)
    basket?: Basket;

    @ManyToOne(() => Products, product => product.id)
    @Field(type => Products)
    product?: Products;

}