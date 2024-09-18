import {AppModule} from '../src/app.module'
import {Connection} from 'typeorm'
import {INestApplication} from '@nestjs/common'
import {Test} from '@nestjs/testing'
import {TypeOrmModule} from '@nestjs/typeorm'

export let app: INestApplication
export let connection: Connection

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [
      AppModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'docker',
        password: 'docker',
        database: 'backend-crud',
        entities: [__dirname + '/../src/**/*.entity.ts'],
        synchronize: true,
      }),
    ],
  }).compile()

  app = moduleFixture.createNestApplication()
  connection = app.get<Connection>(Connection)
  await app.init()
})

afterAll(async () => {
  await app.close()
})
