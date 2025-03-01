import { User } from '@prisma/client'

export interface GetUserProfileUseCaseRequest {
  userId: string
}

export interface GetUserProfileUseCaseResponse {
  user: User
}
