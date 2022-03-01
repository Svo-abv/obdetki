import { Field, ObjectType } from "@nestjs/graphql";
import { Products } from "src/modules/products/models/products.entity";

@ObjectType()
export class OrdersRowsInOrderDto {
    @Field() product?: Products;
    @Field() price: number;
    @Field() count: number;
}