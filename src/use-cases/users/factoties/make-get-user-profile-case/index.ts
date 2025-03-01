import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '@/use-cases/users/get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUsers = new PrismaUsersRepository()
  const getUserProfile = new GetUserProfileUseCase(prismaUsers)

  return getUserProfile
}
