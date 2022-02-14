import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Users } from './models/users.entity';
import { UsersService } from './users.service';

@Resolver(of => Users)
export class UsersResolver {

    constructor(private readonly usersService: UsersService) { }

    @Query(returns => Users)
    async getUserById(@Args('id') id: number): Promise<Users> {

        const user = await this.usersService.getUserById(id);
        if (!user) {
            throw new NotFoundException(id);
        }
        return user;
    }

    @Query(returns => Users)
    async getAllUsers(): Promise<Users[]> {

        const users = await this.usersService.getAllUsers();
        if (!users) {
            throw new NotFoundException();
        }
        return users;

    }
}
