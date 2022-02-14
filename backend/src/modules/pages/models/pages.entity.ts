import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'Pages' })
export class Pages {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    date: string;

    @Column()
    @Field()
    title: string;

    @Column({ type: "text" })
    @Field()
    content: string;

}