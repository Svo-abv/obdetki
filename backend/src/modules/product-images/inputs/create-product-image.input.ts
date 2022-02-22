import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductImagesInput {
    @Field({ nullable: true }) url: string;
    @Field() uuid_1c?: string;
    @Field({ nullable: true }) productId?: number;
    @Field({ nullable: true, defaultValue: false }) default?: boolean;
}