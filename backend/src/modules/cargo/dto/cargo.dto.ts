import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CargoDto {
    @Field() id: number;
    @Field() name: string;
}