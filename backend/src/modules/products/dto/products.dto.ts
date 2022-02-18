import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductsDto {
    @Field() id: number;
}