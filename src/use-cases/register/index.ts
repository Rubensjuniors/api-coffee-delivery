import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/types/users-repository'

import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  photoUrl?: string
  roles?: ('USER' | 'ADMIN')[]
}

interface RegisterUseCaseResponse {
  user: User
}

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
