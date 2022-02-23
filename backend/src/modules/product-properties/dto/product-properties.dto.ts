import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductPropertiesDto {
    @Field() id: number;
}