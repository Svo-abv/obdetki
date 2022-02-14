import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Cargo } from "src/modules/cargo/models/cargo.entity";
import { OrdersRows } from "src/modules/orders-rows/models/orders-rows.entity";
import { Users } from "src/modules/users/models/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'Orders' })
export class Orders {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column({ default: null })
    @Field()
    number: number;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    date: Date;

    @Column({ unique: true })
    @Field()
    uuid_1c: string;

    @ManyToOne(type => Cargo, cargo => cargo.id)
    @Field(type => Cargo)
    cargo: Cargo;

    @ManyToOne(type => Users, user => user.id)
    @Field(type => Users)
    user: Users;

    @OneToMany(() => OrdersRows, ordersRows => ordersRows.order)
    @Field(type => [OrdersRows])
    ordersRows: OrdersRows[];

}