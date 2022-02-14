import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Basket } from "src/modules/basket/models/basket.entity";
import { Orders } from "src/modules/orders/models/orders.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'Users' })
export class Users {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    password: string;

    @Column()
    @Field()
    town: string;

    @Column()
    @Field()
    address: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column()
    @Field()
    telephone: string;

    @Column({ default: "USER" })
    @Field()
    role: string;

    @Column({ unique: true })
    @Field()
    uuid_1c: string;

    @OneToOne(() => Basket, basket => basket.user)
    @Field(type => Basket)
    basket: Basket;

    @OneToMany(() => Orders, order => order.user)
    @Field(type => [Orders])
    order: Orders[];
}