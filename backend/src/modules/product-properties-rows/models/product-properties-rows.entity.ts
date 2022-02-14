import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ProductProperties } from "src/modules/product-properties/models/product-properties.entity";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'ProductPropertiesRows' })
export class ProductPropertiesRows {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    value: string;

    @ManyToOne(type => Products, product => product.id)
    @Field(type => Products)
    product: Products;

    @ManyToOne(type => ProductProperties, property => property.id)
    @Field(type => ProductProperties)
    property: ProductProperties;
}