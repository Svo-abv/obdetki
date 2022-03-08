import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductsFiltersDto {
    @Field() name: string;
    @Field() value: string;
}