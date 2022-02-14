import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './models/users.entity';
import { UsersModel } from './models/users.model';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>) { }

    async getUserById(id: number): Promise<UsersModel> {
        return await this.usersRepository.findOne(id);
    }
}
