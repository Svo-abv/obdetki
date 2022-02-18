import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Context, GqlExecutionContext, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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

    @Query(returns => AuthUserDto)
    async checkAuth(@Context() context: any): Promise<ValidUserDto> {
        const gqlContext = GqlExecutionContext.create(context);
        console.log(gqlContext);
        return this.usersService.checkAuth(context);
    }

    @Query(returns => UserDto)
    async getUserById(@Args('id') id: number): Promise<UserDto> {
        const user = await this.usersService.getUserById(id);
        if (!user) {
            throw new NotFoundException(id);
        }
        return user;
    }

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
}
