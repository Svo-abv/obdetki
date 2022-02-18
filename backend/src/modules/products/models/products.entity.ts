import { ObjectType, Field, ID } from "@nestjs/graphql";
import { BasketRows } from "src/modules/basket-rows/models/basket-rows.entity";
import { OrdersRows } from "src/modules/orders-rows/models/orders-rows.entity";
import { ProductBrands } from "src/modules/product-brands/models/product-brands.entity";
import { ProductCategories } from "src/modules/product-categories/models/product-categories.entity";
import { ProductImages } from "src/modules/product-images/models/product-images.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'Products' })
export class Products {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column({ default: false })
    @Field()
    deleted?: boolean;

    @Column({ default: null })
    @Field()
    name?: string;

    @Column({ default: null })
    @Field()
    code?: string;

    @Column({ default: 0 })
    @Field()
    price?: number;

    @Column({ unique: true })
    @Field()
    uuid_1c?: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @ManyToOne(() => ProductBrands, productBrand => productBrand.id)
    @Field(type => ProductBrands)
    productBrands?: ProductBrands;

    @ManyToOne(() => ProductCategories, productCategory => productCategory.id)
    @Field(type => ProductCategories)
    productCategories?: ProductCategories;

    @OneToMany(() => BasketRows, basketRows => basketRows.product)
    @Field(type => [BasketRows])
    basketRows?: BasketRows[];

    @OneToMany(() => OrdersRows, ordersRows => ordersRows.product)
    @Field(type => [OrdersRows])
    ordersRows?: OrdersRows[];

    @OneToMany(() => ProductImages, productImages => productImages.product)
    @Field(type => [ProductImages])
    productImages?: ProductImages[];

}