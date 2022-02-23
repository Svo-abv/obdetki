import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ProductPropertiesRows } from "src/modules/product-properties-rows/models/product-properties-rows.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'ProductProperties' })
export class ProductProperties {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Index()
    @Field()
    name: string;

    @OneToMany(() => ProductPropertiesRows, productPropertiesRows => productPropertiesRows.propertyId)
    @Field(type => [ProductPropertiesRows])
    productPropertiesRows: ProductPropertiesRows[];

}