import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductBrandsInput {
    @Field({ nullable: true }) name?: string;
    @Field() uuid_1c?: string;
}