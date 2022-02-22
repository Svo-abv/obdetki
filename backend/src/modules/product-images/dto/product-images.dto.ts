import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ProductImagesDto {
    @Field() id: number;
}