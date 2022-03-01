import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class OrdersRowsDto {
    @Field() id: number;
}