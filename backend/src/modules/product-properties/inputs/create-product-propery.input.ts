import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductPropertiesInput {
    @Field({ nullable: true }) name?: string;
}