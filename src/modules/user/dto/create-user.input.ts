import {Field, InputType} from '@nestjs/graphql'
import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field({nullable: false})
  @IsNotEmpty()
  @IsString()
  name: string

  @Field({nullable: false})
  @IsEmail()
  email: string
}
