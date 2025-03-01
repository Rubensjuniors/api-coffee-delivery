import { InMemoryUsersRepositoryMock } from '@memory/in-memory-users-repository-mock'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError'
import { GetUserProfileUseCase } from '.'

let usersRepository: InMemoryUsersRepositoryMock
let sut: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepositoryMock()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Joh Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Joh Doe')
  })
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
