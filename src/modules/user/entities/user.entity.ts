import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm'
import {Field, ID, ObjectType} from '@nestjs/graphql'

@ObjectType()
@Entity()
@Unique(['email'])
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({length: 100})
  name: string

  @Field()
  @Column({unique: true, length: 255})
  email: string
}
