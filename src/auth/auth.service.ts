import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.UserRepository.createUser(authCredentialDto);
    }

    async signIn(authcredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        const { username, password } = authcredentialDto;
        const user = await this.UserRepository.findOneBy({ username });

        // compare: 비교
        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성(Secret + Payload)
            const payload = { username } // 중요한 정보는 넣으면 안됨
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed')
        }
    }
}
