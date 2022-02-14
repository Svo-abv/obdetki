import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'ProductPropertiesRows' })
export class ProductPropertiesRowsModel {
    @Field(type => ID)
    id: number;

}