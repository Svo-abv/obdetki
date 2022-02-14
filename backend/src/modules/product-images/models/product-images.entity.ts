import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductImages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ default: false })
    default: boolean;

    @ManyToOne(type => Products, product => product.id)
    product: Products;

}