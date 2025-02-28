import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/use-cases/factoties/make-get-user-profile-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()
  const {
    user: { email, created_at, id, name, photo_url, roles },
  } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    id,
    name,
    email,
    created_at,
    photo_url,
    roles,
  })
}
