import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BasketRows } from "src/modules/basket-rows/models/basket-rows.entity";
import { Users } from "src/modules/users/models/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'Basket' })
export class Basket {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id?: number;

    @Column({ default: null })
    @Field()
    userId: number;

    @OneToOne(() => Users, user => user.id, { nullable: true })
    @JoinColumn()
    @Field(type => Users, { nullable: true })
    user?: Users;

    @OneToMany(() => BasketRows, basketRows => basketRows.basketId, { nullable: true })
    @Field(type => [BasketRows], { nullable: 'itemsAndList' })
    basketRows?: BasketRows[];

}