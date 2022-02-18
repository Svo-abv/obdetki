import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'ProductBrands' })
export class ProductBrands {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    name?: string;

    @Column({ unique: true })
    @Field()
    uuid_1c?: string;

    @OneToMany(() => Products, product => product.productBrands)
    @Field(type => [Products])
    product: Products[];
}