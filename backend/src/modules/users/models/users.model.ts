import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Users' })
export class UsersModel {
    @Field(type => ID)
    id: number;

}