import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'ProductBrands' })
export class ProductBrandsModel {
    @Field(type => ID)
    id: number;

}