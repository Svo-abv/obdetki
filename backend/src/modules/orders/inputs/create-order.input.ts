import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateOrderInput {
    @Field() cargoId: number;
    @Field() userId: number;
    @Field() comment?: string;
}