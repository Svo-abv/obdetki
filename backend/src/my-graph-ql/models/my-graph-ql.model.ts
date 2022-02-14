import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'MyGraphQl' })
export class MyGraphQl {
    @Field(type => ID)
    id: string;

    @Field()
    title: string;

}