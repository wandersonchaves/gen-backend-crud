import {DeleteResult, UpdateResult} from 'typeorm'
import {Test, TestingModule} from '@nestjs/testing'

import {CreateUserInput} from './dto/create-user.input'
import {Repository} from 'typeorm'
import {UpdateUserInput} from './dto/update-user.input'
import {User} from './entities/user.entity'
import {UserService} from './user.service'
import {getRepositoryToken} from '@nestjs/typeorm'

describe('UserService', () => {
  let service: UserService
  let repository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneOrFail: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            preload: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    repository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a user', async () => {
    const createUserDto: CreateUserInput = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    }
    const user = {id: 1, ...createUserDto}

    jest.spyOn(repository, 'create').mockReturnValue(user)
    jest.spyOn(repository, 'save').mockResolvedValue(user)

    expect(await service.create(createUserDto)).toEqual(user)
  })

  it('should find all users', async () => {
    const users = [{id: 1, name: 'John Doe', email: 'john.doe@example.com'}]
    jest.spyOn(repository, 'find').mockResolvedValue(users)

    expect(await service.findAll()).toEqual(users)
  })

  it('should find one user by ID', async () => {
    const user = {id: 1, name: 'Jane Doe', email: 'jane.doe@example.com'}

    jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(user)

    expect(await service.findOne(1)).toEqual(user)
  })

  it('should update a user', async () => {
    const updateUserDto: UpdateUserInput = {id: 1, name: 'Jane Doe'}
    const user = {id: 1, name: 'Jane Doe', email: 'john.doe@example.com'}

    const mockUpdateResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    }

    jest.spyOn(repository, 'findOne').mockResolvedValue(user)
    jest.spyOn(repository, 'update').mockResolvedValue(mockUpdateResult)
    jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(user)

    expect(await service.update(updateUserDto.id, updateUserDto)).toEqual(user)
  })

  it('should delete a user', async () => {
    const mockDeleteResult: DeleteResult = {
      affected: 1,
      raw: {},
    }

    jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult)

    expect(await service.remove(1)).toBe(true)
  })
})
