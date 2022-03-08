import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class OrdersUpdateUuid1cDto {
    @Field() affected?: number;
}