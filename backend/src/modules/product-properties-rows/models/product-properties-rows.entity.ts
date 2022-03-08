import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ProductProperties } from "src/modules/product-properties/models/product-properties.entity";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'ProductPropertiesRows' })
export class ProductPropertiesRows {

    @PrimaryGeneratedColumn()
    @Field(type => ID, { nullable: true })
    id: number;

    @Column()
    @Field({ nullable: true })
    @Index()
    value: string;

    @Column()
    @Field({ nullable: true })
    propertyId: number;

    @Column()
    @Field({ nullable: true })
    productId: number;

    @ManyToOne(type => Products, product => product.id, { onDelete: "CASCADE" })
    @Field(type => Products, { nullable: true })
    product: Products;

    @ManyToOne(type => ProductProperties, property => property.id, { onDelete: "CASCADE" })
    @JoinColumn()
    @Field(type => ProductProperties, { nullable: true })
    property: ProductProperties;
}