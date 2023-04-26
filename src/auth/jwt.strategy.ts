import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as config from 'config';

// 다른 곳에서도 주입을 해서 사용가능하게 하기 위해 Injectable 데코레이션 사용
@Injectable()
// PassportStrategy 클래스 상속, jwt-strategy를 사용하기 위해 Strategy를 넣어줌
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
        // 토큰이 유효한지 확인하기위해 username으로 객체를 가지고올것이기때문에 사용
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
            // 토큰이 유효한지 체크하기위해 secretkey를 생성할때와 동일하게 넣어줌
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            // 토큰이 어디에서 가져오는지 -> Header에서 가져온다고 알려줌(BearerToken타입)
            // BearerToken타입으로 날라온 토큰을 secret키로 유효한지 확인해주는 단계
        })
    }

    // 위에서 토큰이 유효한지 체크가 되면 validate 메소드에서 payload에 있는 유저이름이 데이터베이스에서
    // 있는 유저인지 확인 후 있다면 유저 객체를 return 값으로 던져줌
    // return 값은 @UserGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어감
    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOneBy({ username });

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}