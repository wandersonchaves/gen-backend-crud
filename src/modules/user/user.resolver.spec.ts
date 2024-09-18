import {Test, TestingModule} from '@nestjs/testing'

import {CreateUserInput} from './dto/create-user.input'
import {UserResolver} from './user.resolver'
import {UserService} from './user.service'

describe('UserResolver', () => {
  let resolver: UserResolver
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            createUser: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create a user', async () => {
    const createUserDto: CreateUserInput = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    }
    const user = {id: 1, ...createUserDto}
    jest.spyOn(service, 'create').mockResolvedValue(user)

    expect(await resolver.createUser(createUserDto)).toEqual(user)
  })

  it('should find all users', async () => {
    const users = [{id: 1, name: 'John Doe', email: 'john.doe@example.com'}]
    jest.spyOn(service, 'findAll').mockResolvedValue(users)

    expect(await resolver.findAll()).toEqual(users)
  })

  it('should find one user by ID', async () => {
    const user = {id: 1, name: 'John Doe', email: 'john.doe@example.com'}
    jest.spyOn(service, 'findOne').mockResolvedValue(user)

    expect(await resolver.findOne(1)).toEqual(user)
  })

  it('should update a user', async () => {
    const updateUserDto = {id: 1, name: 'Jane Doe'}
    const user = {id: 1, name: 'Jane Doe', email: 'john.doe@example.com'}
    jest.spyOn(service, 'update').mockResolvedValue(user)

    expect(await resolver.updateUser(updateUserDto)).toEqual(user)
  })

  it('should delete a user', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(true)

    expect(await resolver.removeUser(1)).toBe(true)
  })
})
