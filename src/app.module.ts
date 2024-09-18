import {ConfigModule, ConfigService} from '@nestjs/config'

import {ApolloDriver} from '@nestjs/apollo'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {GraphQLModule} from '@nestjs/graphql'
import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UserModule} from './modules/user/user.module'
import {join} from 'path'

@Module({
  imports: [
    // Carregar variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),

    // Configuração GraphQL
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: process.env.NODE_ENV !== 'production',
    }),

    // Configuração TypeORM com variáveis de ambiente
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
        migrations: [__dirname + '/migrations/*.ts'],
        autoLoadEntities: true,
      }),
    }),

    // Módulos da aplicação
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
