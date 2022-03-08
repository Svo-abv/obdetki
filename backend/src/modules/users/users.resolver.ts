import { createParamDecorator, ExecutionContext, NotFoundException, Request, UseGuards } from '@nestjs/common';
import { Args, GqlExecutionContext, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BasketService } from '../basket/basket.service';
import { Basket } from '../basket/models/basket.entity';
import { Orders } from '../orders/models/orders.entity';
import { OrdersService } from '../orders/orders.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { ValidUserDto } from './dto/valid-user.dto';
import { LoginUserInput } from './inputs/login-user.input';
import { UserInput } from './inputs/create-user.input';
import { Users } from './models/users.entity';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { UserUpdateInput } from './inputs/update-user.input';
import { UserUpdateDto } from './dto/update-user.dto';


export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>
        GqlExecutionContext.create(ctx).getContext().req['user'],
);

@Resolver(of => Users)
export class UsersResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly basketService: BasketService,
        private readonly ordersService: OrdersService,
    ) { }

    @Mutation(returns => ValidUserDto)
    async registration(@Args('data') data: UserInput): Promise<ValidUserDto> {
        return this.usersService.registration(data);
    }

    @Query(returns => ValidUserDto)
    async login(@Args('data') data: LoginUserInput): Promise<ValidUserDto> {
        return this.usersService.login(data);
    }

    @UseGuards(CheckAuthGuard)
    @Query(returns => AuthUserDto)
    async checkAuth(@User() user: any): Promise<ValidUserDto> {
        return this.usersService.checkAuth(user);
    }

    @UseGuards(CheckAuthGuard)
    @Query(returns => UserDto)
    async getUserById(@Args('id') id: number): Promise<UserDto> {
        const user = await this.usersService.getUserById(id);
        if (!user) {
            throw new NotFoundException(id);
        }
        return user;
    }

    @UseGuards(CheckAuthGuard)
    @Query(returns => [UserDto])
    async getAllUsers(): Promise<UserDto[]> {
        const users = await this.usersService.getAllUsers();
        if (!users) {
            throw new NotFoundException();
        }
        return users;
    }

    @ResolveField('basket', returns => Basket, { nullable: true })
    async getBasket(@Parent() user: Users) {
        const { id } = user;
        return this.basketService.getBasketByUserId(id);
    }

    @ResolveField('order', returns => [Orders], { nullable: true })
    async getOrders(@Parent() user: Users) {
        const { id } = user;
        return this.ordersService.getOrdersByUserId(id);
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => UserUpdateDto)
    async update(@Args('data') data: UserUpdateInput): Promise<UserUpdateDto> {
        return this.usersService.update(data);
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => UserUpdateDto)
    async setUserUuid1cById(@Args('data') data: UserUpdateInput): Promise<UserUpdateDto> {
        try {
            return await this.usersService.setUserUuid1cById(data);
        } catch (e) {
            throw new NotFoundException(e);
        }

    }
}
