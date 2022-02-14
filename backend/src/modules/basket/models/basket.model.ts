import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Basket' })
export class BasketModel {
    @Field(type => ID)
    id: number;

}