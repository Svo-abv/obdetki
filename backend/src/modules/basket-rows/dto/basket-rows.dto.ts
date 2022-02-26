import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BasketRowsDto {
    @Field({ nullable: true }) id?: number;
    @Field() count: number;
}