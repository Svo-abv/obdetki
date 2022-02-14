import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'ProductCategories' })
export class ProductCategoriesModel {
    @Field(type => ID)
    id: number;

}