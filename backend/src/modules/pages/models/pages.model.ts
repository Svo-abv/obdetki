import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Pages' })
export class PagesModel {
    @Field(type => ID)
    id: number;

}