import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class ValidUserDto {
    @Field({ nullable: true }) id?: number;
    @Field() JWTKey: string;
    @Field({ nullable: true }) name?: string;
}