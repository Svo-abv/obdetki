import { ObjectType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserUpdateInput {
    @Field() id: number;
    @Field({ nullable: true }) name?: string;
    @Field({ nullable: true }) town?: string;
    @Field({ nullable: true }) telephone?: string;
    @Field({ nullable: true }) uuid_1c?: string;
}