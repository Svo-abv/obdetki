import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'ProductProperties' })
export class ProductPropertiesModel {
    @Field(type => ID)
    id: number;

}