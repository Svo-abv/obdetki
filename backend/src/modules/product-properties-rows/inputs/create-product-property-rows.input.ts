import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ProductPropertiesRowsInput {
    @Field({ nullable: true }) value?: string;
    @Field({ nullable: true }) propertyId?: number;
    @Field({ nullable: true }) productId?: number;
}