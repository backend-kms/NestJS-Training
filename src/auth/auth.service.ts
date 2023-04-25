import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
    ) { }

    async signUp(AuthCredentialDto: AuthCredentialDto): Promise<void> {
        return this.UserRepository.createUser(AuthCredentialDto);
    }
}
