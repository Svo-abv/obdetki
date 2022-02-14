import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Cargo' })
export class CargoModel {
    @Field(type => ID)
    id: number;

}