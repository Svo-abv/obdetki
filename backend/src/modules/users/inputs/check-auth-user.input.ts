import { ObjectType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChekAuthInput {
    @Field() jwt: string;
}