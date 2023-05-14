import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository, handleRetry } from "@nestjs/typeorm";
import CreateUserDTO from "src/user/dto/user.dto";
import User from "src/user/user.entity";
import UserService from "src/user/user.service";
import { Repository } from "typeorm";
import bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/postgresErrorCodes.enum';

@Injectable()
class AuthenticationService {
    constructor(
        private readonly usersService: UserService
    ) {}

    async register(userData: CreateUserDTO) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        try {
            const createUser = await this.usersService.create({
                ...userData,
                password: hashedPassword
            });
            createUser.password = undefined;
            return createUser;
        } catch (e) {
            if (e?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            user.password = undefined;
            return user;
        } catch (e) {
            throw new HttpException('Wrong credentals provided', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(hashedPassword, plainTextPassword);
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentals provided', HttpStatus.BAD_REQUEST);
        }
    }
}
