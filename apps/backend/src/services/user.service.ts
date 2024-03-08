import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models';
import { pick } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async createUser(userData: Partial<UserModel>): Promise<string> {
    const newUser = this.userRepository.create(userData);
    const user = await this.userRepository.save(newUser);

    return user.id.toString()
  }

  async getUser(id: string): Promise<Partial<UserModel>> {

    const user = await this.userRepository.findOne({
      where: {
        id
      }
    })

    return pick(user, ['id', 'phone', 'username'])
  }
}
