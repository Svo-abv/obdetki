import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './models/users.entity';

@Module({
  providers: [UsersService, UsersResolver],
  imports: [TypeOrmModule.forFeature([Users]),]
})
export class UsersModule { }
