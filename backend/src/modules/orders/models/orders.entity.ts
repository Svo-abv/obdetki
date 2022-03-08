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
    number: string;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    date: Date;

    @Column({ default: null })
    @Field()
    cargoId: number;

    @Column({ default: null })
    @Field()
    userId: number;

    @Column({ unique: true, default: null })
    @Field({ nullable: true })
    uuid_1c: string;

    @Column({ default: null, type: "text" })
    @Field()
    comment: string;

    @ManyToOne(type => Cargo, cargo => cargo.id)
    @Field(type => Cargo, { nullable: true })
    cargo: Cargo;

    @ManyToOne(type => Users, user => user.id)
    @Field(type => Users, { nullable: true })
    user: Users;

    @OneToMany(() => OrdersRows, ordersRows => ordersRows.orderId, { onDelete: "CASCADE" })
    @Field(type => [OrdersRows], { nullable: true })
    ordersRows: OrdersRows[];

}