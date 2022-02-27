import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BasketRowsDto {
    @Field({ nullable: true }) id?: number;
    @Field({ defaultValue: 0, nullable: true }) count: number;
    @Field({ defaultValue: 0, nullable: true }) sum?: number;
}