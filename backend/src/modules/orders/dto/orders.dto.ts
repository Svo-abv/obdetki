import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class OrdersDto {
    @Field() id: number;
    @Field() number?: string;
}