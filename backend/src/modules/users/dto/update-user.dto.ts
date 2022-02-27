import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserUpdateDto {
    @Field({ defaultValue: false }) updated: boolean;

}