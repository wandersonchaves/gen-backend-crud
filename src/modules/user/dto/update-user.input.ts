import {Field, InputType, Int, PartialType} from '@nestjs/graphql'
import {IsEmail, IsInt, IsOptional, IsString} from 'class-validator'

import {CreateUserInput} from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  @IsInt()
  id: number

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  name?: string

  @Field({nullable: true})
  @IsOptional()
  @IsEmail()
  email?: string
}
