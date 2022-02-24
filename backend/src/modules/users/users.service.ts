import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/utils/auth/auth.service';
import { Repository } from 'typeorm';
import { Users } from './models/users.entity';
import * as bcrypt from 'bcrypt';
import { UserInput } from './inputs/create-user.input';
import { ValidUserDto } from './dto/valid-user.dto';
import { LoginUserInput } from './inputs/login-user.input';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private authService: AuthService) { }

    async getUserById(id: number): Promise<UserDto> {
        return await this.usersRepository.findOne(id);
    }

    async getAllUsers(): Promise<UserDto[]> {
        return await this.usersRepository.find();
    }

    async registration(data: UserInput): Promise<ValidUserDto> {
        try {
            const hsh = await bcrypt.hash(data.password, 5);
            const newUser = this.usersRepository.create({ ...data, password: hsh });
            const result = await this.usersRepository.save(newUser);
            const jwt = this.authService.sign({ id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role });
            return { ...result, JWTKey: jwt };
        } catch (e) {
            throw new HttpException("Ошибка при регистрации", HttpStatus.BAD_REQUEST);
        }
    }

    async checkAuth(user: Users): Promise<ValidUserDto> {
        const key = this.authService.sign({ id: user.id, email: user.email, name: user.name, role: user.role });
        return { JWTKey: key };
    }

    async login(dto: LoginUserInput): Promise<ValidUserDto> {
        const currUser = await this.usersRepository.findOne({ where: { email: dto.email } });
        if (!currUser) {
            throw new HttpException("Пользователь ненайден!", HttpStatus.BAD_REQUEST);
        }
        const hsh = await bcrypt.compare(dto.password, currUser.password);
        if (!hsh)
            throw new HttpException("Пароль не верен!", HttpStatus.BAD_REQUEST);

        const key = this.authService.sign({ id: currUser.id, email: currUser.email, name: currUser.name, role: currUser.role });
        return { JWTKey: key };
    }
}
