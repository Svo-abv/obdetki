import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'OrdersRows' })
export class OrdersRowsModel {
    @Field(type => ID)
    id: number;

}