import { Basket } from "src/modules/basket/models/basket.entity";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BasketRows {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count: number;

    @Column()
    price: number;

    @ManyToOne(type => Basket, basket => basket.id)
    basket: Basket;

    @ManyToOne(type => Products, product => product.id)
    product: Products;

}