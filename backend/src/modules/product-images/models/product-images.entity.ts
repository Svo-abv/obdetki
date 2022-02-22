import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'ProductImages' })
export class ProductImages {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    url: string;

    @Column({ default: false })
    @Field()
    default: boolean;

    @Column({ unique: true })
    @Field({ nullable: true })
    uuid_1c?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    productId?: number;

    @ManyToOne(() => Products, product => product.id)
    @Field(type => Products)
    product: Products;

}