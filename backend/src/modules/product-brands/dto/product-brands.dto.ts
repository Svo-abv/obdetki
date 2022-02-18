import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductBrandsDto {
    @Field() id: number;
}