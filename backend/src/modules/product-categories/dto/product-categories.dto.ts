import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductCategoriesDto {
    @Field() id: number;
}