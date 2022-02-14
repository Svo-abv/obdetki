import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'ProductImages' })
export class ProductImagesModel {
    @Field(type => ID)
    id: number;

}