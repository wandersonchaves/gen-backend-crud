import * as request from 'supertest'

import {Connection} from 'typeorm'
import {app} from './setup'

describe('User Module (e2e)', () => {
  let server: any
  let testEmail: string
  let userId: number | null = null

  beforeAll(() => {
    server = app.getHttpServer()
    testEmail = `testuser_${Date.now()}@example.com`
  })

  it('should create a user with a unique email', async () => {
    const createUserMutation = `
      mutation {
        createUser(createUserInput: {
          name: "John Doe",
          email: "${testEmail}"
        }) {
          id
          email
        }
      }
    `

    const response = await request(server)
      .post('/graphql')
      .send({query: createUserMutation})
      .expect(200)

    const {createUser} = response.body?.data || {}
    expect(createUser).toHaveProperty('email', testEmail)
    expect(createUser).toHaveProperty('id')

    // Atribuição do userId após a criação do usuário
    userId = createUser.id
    expect(userId).not.toBeNull()
  })

  it('should return an error when trying to create a user with a duplicate email', async () => {
    const createUserMutation = `
      mutation {
        createUser(createUserInput: {
          name: "Jane Doe",
          email: "${testEmail}",
        }) {
          id
          email
        }
      }
    `

    const response = await request(server)
      .post('/graphql')
      .send({query: createUserMutation})
      .expect(200)

    const {errors} = response.body
    expect(errors).toBeDefined()
    expect(errors[0].message).toContain('Email already exists')
  })

  it('should retrieve all users', async () => {
    const response = await request(server)
      .post('/graphql')
      .send({
        query: `
        query {
          users {
            id
            name
            email
          }
        }
        `,
      })
      .expect(200)

    const {data} = response.body
    expect(data.users).toBeInstanceOf(Array)
    expect(data.users.length).toBeGreaterThan(0)
  })

  it('should update a user', async () => {
    const response = await request(server)
      .post('/graphql')
      .send({
        query: `
        mutation {
          updateUser(updateUserInput: {
            id: ${userId},
            name: "John Updated",
            email: "johnupdated@example.com"
          }) {
            id
            name
            email
          }
        }
        `,
      })
      .expect(200)

    const {data} = response.body
    expect(data.updateUser.name).toBe('John Updated')
    expect(data.updateUser.email).toBe('johnupdated@example.com')
  })

  it('should delete a user', async () => {
    if (userId === null) {
      throw new Error('userId is null. User was not created successfully.')
    }

    const deleteUserMutation = `
      mutation {
        removeUser(id: ${userId})
      }
    `

    const response = await request(server)
      .post('/graphql')
      .send({query: deleteUserMutation})
      .expect(200)

    const {removeUser} = response.body?.data || {}
    expect(removeUser).toBe(true)
  })

  afterAll(async () => {
    const connection = app.get(Connection)
    await connection.createQueryBuilder().delete().from('user').execute()
  })
})
