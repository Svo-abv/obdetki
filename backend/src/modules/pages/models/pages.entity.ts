import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({ description: 'Pages' })
export class Pages {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    date: string;

    @Column({ default: null })
    @Field()
    title: string;

    @Column()
    @Field()
    url: string;

    @Column({ type: "text", default: null })
    @Field()
    description: string;

    @Column({ type: "text", default: null })
    @Field()
    content: string;

}