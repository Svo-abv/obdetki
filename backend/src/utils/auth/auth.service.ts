import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    verify(JwtKey: string): any {

        return this.jwtService.verify(JwtKey);
    }

    sign(data: any): any {
        return this.jwtService.sign(data);
    }

    decode(data: any): any {
        return this.jwtService.decode(data);
    }
}
