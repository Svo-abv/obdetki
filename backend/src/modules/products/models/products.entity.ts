import { ObjectType, Field, ID } from "@nestjs/graphql";
import { type } from "os";
import { BasketRows } from "src/modules/basket-rows/models/basket-rows.entity";
import { OrdersRows } from "src/modules/orders-rows/models/orders-rows.entity";
import { ProductBrands } from "src/modules/product-brands/models/product-brands.entity";
import { ProductCategories } from "src/modules/product-categories/models/product-categories.entity";
import { ProductImages } from "src/modules/product-images/models/product-images.entity";
import { ProductPropertiesRows } from "src/modules/product-properties-rows/models/product-properties-rows.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'Products' })
export class Products {

    @PrimaryGeneratedColumn()
    @Field(type => ID, { nullable: true })
    id: number;

    @Column({ default: false })
    @Field({ nullable: true })
    deleted?: boolean;

    @Column({ default: null })
    @Field({ nullable: true })
    name?: string;

    @Column({ default: null })
    @Field({ nullable: true })
    code?: string;

    @Column({ default: 0 })
    @Field({ nullable: true })
    price?: number;

    @Column({ default: 0 })
    @Field({ nullable: true })
    oldPrice?: number;

    @Column({ unique: true })
    @Field({ nullable: true })
    uuid_1c?: string;

    @Column({ default: null })
    @Field({ nullable: true })
    productBrandsId?: number;

    @Column({ default: null })
    @Field({ nullable: true })
    productCategoriesId?: number;

    @Column({ type: "tsvector", default: null, },)
    @Index("idx_document_tsv", { synchronize: false })
    @Field({ nullable: true })
    documentTsv?: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    @Field({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    @Field({ nullable: true })
    updatedAt: Date;

    @ManyToOne(() => ProductBrands, productBrand => productBrand.id, { onDelete: "CASCADE" })
    @Field(type => ProductBrands)
    productBrands?: ProductBrands;

    @ManyToOne(() => ProductCategories, productCategory => productCategory.id, { onDelete: "CASCADE" })
    @Field(type => ProductCategories)
    productCategories?: ProductCategories;

    @OneToMany(() => BasketRows, basketRows => basketRows.productId)
    @Field(type => [BasketRows])
    basketRows?: BasketRows[];

    @OneToMany(() => OrdersRows, ordersRows => ordersRows.product)
    @Field(type => [OrdersRows])
    ordersRows?: OrdersRows[];

    @OneToMany(() => ProductImages, productImages => productImages.productId, { onDelete: "CASCADE" })
    @Field(type => ProductImages, { nullable: true })
    productImages?: ProductImages;

    @OneToMany(() => ProductPropertiesRows, prop => prop.productId, { onDelete: "CASCADE" })
    @Field(type => [ProductPropertiesRows], { nullable: true })
    productPropertiesRows?: [ProductPropertiesRows];

}