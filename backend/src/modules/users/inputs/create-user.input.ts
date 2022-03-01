import { ObjectType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserInput {
    @Field() email: string;
    //@Field() password: string;
    // @Field({ nullable: true }) role?: string;
    @Field({ nullable: true }) name?: string;
    @Field({ nullable: true }) town?: string;
    // @Field({ nullable: true }) address?: string;
    @Field({ nullable: true }) telephone?: string;
}