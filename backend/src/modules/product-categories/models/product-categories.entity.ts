import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'ProductCategories' })
export class ProductCategories {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    uuid_1c: string;

    @OneToMany(() => Products, product => product.productCategories)
    @Field(type => [Products])
    product: Products[];

    @OneToMany(() => ProductCategories, productCategory => productCategory.id)
    @Field(type => [ProductCategories])
    parentCategory: ProductCategories[];

}