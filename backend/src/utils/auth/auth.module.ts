import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';


@Module({
  providers: [AuthService],
  imports: [JwtModule.register({
    secret: String(process.env.SECRET),
    signOptions: { expiresIn: '24h' },
  })],
  exports: [AuthService]
})
export class AuthModule { }
