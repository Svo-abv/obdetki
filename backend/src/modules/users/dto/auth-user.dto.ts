import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class AuthUserDto {
    @Field() JWTKey: string;
}