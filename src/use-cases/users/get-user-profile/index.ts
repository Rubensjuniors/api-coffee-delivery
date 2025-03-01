import { UsersRepository } from '@/repositories/types/users-repository'

import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError'
import { GetUserProfileUseCaseRequest, GetUserProfileUseCaseResponse } from './types'

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
