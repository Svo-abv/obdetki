import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('ProductImageUploadType')
export class ProductImageUploadType {
    @Field({ nullable: true })
    success: boolean;

    @Field({ nullable: true })
    filename?: string;
}