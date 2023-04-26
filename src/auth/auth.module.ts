import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from 'config';
// Secret: 토큰을 만들 때 이용하는 Secret 텍스트(아무거나 넣어줘도 됨)
// ExpiresIn: 정해진 시간 이후에는 토큰이 유효하지 않게 됨 60*60은 1시간

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // Secret: 토큰을 만들 때 이용하는 Secret 텍스트(아무거나 넣어줘도 됨)
      // ExpiresIn: 정해진 시간 이후에는 토큰이 유효하지 않게 됨 60*60은 1시간
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    }),
    TypeOrmModule.forFeature([User])
    // forFeature: 해당 모듈안에 repository를 등록
    // 강의 TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  // 다른 모듈에서 사용하기 위해 넣어줌
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }