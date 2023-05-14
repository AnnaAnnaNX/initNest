import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import CreateUserDTO from './dto/user.dto';
 
@Injectable()
class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    async getByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND) 
        }
        return user;
    }

    async create(userData: CreateUserDTO) {
        const user = await this.usersRepository.create(userData);
        await this.usersRepository.save(user);
        return user;
    }
}

export default UserService;