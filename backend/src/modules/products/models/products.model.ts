import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Products' })
export class ProductsModel {
    @Field(type => ID)
    id: number;

}