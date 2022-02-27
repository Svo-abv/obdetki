import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Orders } from "src/modules/orders/models/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'Cargo' })
export class Cargo {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ default: 0 })
    @Field()
    minimalSumm: number;

    @OneToMany(() => Orders, orders => orders.cargoId, { onDelete: "SET NULL" })
    @Field(type => [Orders])
    orders: Orders[];

}