import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersModel } from './models/users.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {

    constructor(private readonly usersService: UsersService) { }

    @Query(returns => UsersModel)
    async getUserById(@Args('id') id: number): Promise<UsersModel> {

        const user = await this.usersService.getUserById(id);
        if (!user) {
            throw new NotFoundException(id);
        }
        return user;

    }
}
