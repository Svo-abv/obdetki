import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class setOrder1CUuidInput {
    @Field() id: number;
    @Field() uuid_1c: string;
}