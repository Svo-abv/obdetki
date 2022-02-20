import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductCategoriesInput {
    @Field({ nullable: true }) name?: string;
    @Field() uuid_1c?: string;
    @Field({ nullable: true }) parentId?: number;
}