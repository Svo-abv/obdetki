import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'ProductCategories' })
export class ProductCategories {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    name?: string;

    @Column({ nullable: true })
    @Field()
    parentId?: number;

    @Column({ nullable: true })
    @Field()
    order?: number;

    @Column({ unique: true })
    @Field()
    uuid_1c?: string;

    // @OneToMany(() => Products, product => product.productCategoriesId, { onDelete: "SET NULL" })
    // @Field(type => [Products])
    // product: Products[];

    @ManyToOne(() => ProductCategories, productCategory => productCategory.id, { onDelete: "CASCADE" })
    @JoinColumn()
    @Field(type => ProductCategories, { nullable: true })
    parent?: ProductCategories;

    @OneToMany(() => ProductCategories, productCategory => productCategory.id)
    @Field(type => [ProductCategories], { nullable: true })
    children?: ProductCategories[];

}