import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/types/users-repository'

import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError'
import { RegisterUseCaseRequest, RegisterUseCaseResponse } from './types'

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    photoUrl,
    roles,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const checkEmail = await this.usersRepository.findByEmail(email)

    if (checkEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      photo_url: photoUrl ? photoUrl : '',
      roles,
    })

    return {
      user,
    }
  }
}
