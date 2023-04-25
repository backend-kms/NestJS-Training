import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User) private dataSource: DataSource) {
        super(User, dataSource.manager)
    }
    async createUser(AuthCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = AuthCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword });

        try {
            await this.save(user);
        } catch (error) {
            // console.log('error', error);
            if (error.code === '23505') {
                throw new ConflictException('Existing username.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}