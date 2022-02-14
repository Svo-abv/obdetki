import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Orders' })
export class OrdersModel {
    @Field(type => ID)
    id: number;

}