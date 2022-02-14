import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ProductPropertiesRows } from "src/modules/product-properties-rows/models/product-properties-rows.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'ProductProperties' })
export class ProductProperties {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    uuid_1c: string;

    @OneToMany(() => ProductPropertiesRows, productPropertiesRows => productPropertiesRows.property)
    @Field(type => [ProductPropertiesRows])
    productPropertiesRows: ProductPropertiesRows[];

}