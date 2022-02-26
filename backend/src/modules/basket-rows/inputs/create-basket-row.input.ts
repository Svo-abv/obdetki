import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class BasketRowInput {
    @Field() count: number;
    @Field() price: number;
    @Field() productId: number;
}



