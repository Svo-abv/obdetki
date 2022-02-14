import { ProductProperties } from "src/modules/product-properties/models/product-properties.entity";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductPropertiesRows {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(type => Products, product => product.id)
    product: Products;

    @ManyToOne(type => ProductProperties, property => property.id)
    property: ProductProperties;
}