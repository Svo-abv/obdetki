import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductPropertiesRowsDto {
    @Field() id: number;
}