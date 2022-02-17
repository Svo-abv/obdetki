import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {
    @Field() email: string;
    @Field({ nullable: true }) role?: string;
    @Field({ nullable: true }) name?: string;
    @Field({ nullable: true }) town?: string;
    @Field({ nullable: true }) address?: string;
    @Field({ nullable: true }) telephone?: string;
}