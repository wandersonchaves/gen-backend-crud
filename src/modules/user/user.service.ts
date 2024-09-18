import {CreateUserInput} from './dto/create-user.input'
import {ConflictException, Injectable} from '@nestjs/common'
import {UpdateUserInput} from './dto/update-user.input'
import {InjectRepository} from '@nestjs/typeorm'
import {User} from './entities/user.entity'
import type {Repository} from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const user = this.userRepository.create(createUserInput)
      return await this.userRepository.save(user)
    } catch (error) {
      if (error.code === '23505') {
        // Código para violação de chave única no PostgreSQL
        throw new ConflictException('Email already exists')
      }
      throw error
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({where: {id}})
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(id, updateUserInput)
    return this.userRepository.findOneOrFail({where: {id}})
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id)
    return result.affected > 0
  }
}
