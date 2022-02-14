import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './models/users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>) { }

    async getUserById(id: number): Promise<Users> {
        return await this.usersRepository.findOne(id);
    }

    async getAllUsers(): Promise<Users[]> {
        return await this.usersRepository.find();
    }
}
