import {AppModule} from './app.module'
import {NestFactory} from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:4200', // Pode colocar '*' para permitir qualquer origem, mas é melhor especificar.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  await app.listen(3000)
}
bootstrap()
