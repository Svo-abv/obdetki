import { ObjectType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class FilterProductInput {
    @Field({ nullable: true }) name?: string;
    @Field({ nullable: true }) value?: string;
}