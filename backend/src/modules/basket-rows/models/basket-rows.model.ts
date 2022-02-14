import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'BasketRows' })
export class BasketRowsModel {
    @Field(type => ID)
    id: number;

}