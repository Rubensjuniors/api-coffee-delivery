import { User } from '@prisma/client'

export interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  photoUrl?: string
  roles?: ('USER' | 'ADMIN')[]
}

export interface RegisterUseCaseResponse {
  user: User
}
