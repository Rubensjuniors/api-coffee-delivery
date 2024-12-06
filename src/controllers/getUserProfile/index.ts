import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/ResourceNotFoundError'
import { makeGetUserProfileUseCase } from '@/use-cases/factoties/make-get-user-profile-case'

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const requestParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = requestParamsSchema.parse(request.params)

  try {
    const makeGetUserProfile = makeGetUserProfileUseCase()
    const { user } = await makeGetUserProfile.execute({
      userId: id,
    })

    return reply.status(200).send(user)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
