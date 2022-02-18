import { ObjectType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductInput {
    @Field({ nullable: true }) deleted?: boolean;
    @Field({ nullable: true }) name?: string;
    @Field({ nullable: true }) code?: string;
    @Field({ nullable: true }) price?: number;
    @Field() uuid_1c?: string;
    @Field({ nullable: true }) productBrandsId?: number;
    @Field({ nullable: true }) productCategoriesId?: number;
}