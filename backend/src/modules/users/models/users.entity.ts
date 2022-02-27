import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { Basket } from "src/modules/basket/models/basket.entity";
import { Orders } from "src/modules/orders/models/orders.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'Users' })
export class Users {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column({ default: null })
    @Field()
    name?: string;

    @Column()
    @HideField()
    password?: string;

    @Column({ default: null })
    @Field()
    town?: string;

    @Column({ default: null })
    @Field()
    address?: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column({ default: null })
    @Field()
    telephone?: string;

    @Column({ default: "USER" })
    @Field()
    role?: string;

    @Column({ unique: true, default: null })
    @Field()
    uuid_1c?: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @OneToOne(() => Basket, basket => basket.userId, { nullable: true, onDelete: "CASCADE" })
    @Field(type => Basket, { nullable: true })
    basket?: Basket;

    @OneToMany(() => Orders, order => order.userId, { nullable: true, onDelete: "CASCADE" })
    @Field(type => [Orders], { nullable: 'itemsAndList' })
    order?: Orders[];
}