import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/InvalidCredentialsError'
import { makeAuthenticateuseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = requestBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateuseCase()
    const {
      user: { email: userEmail, id, name, photo_url },
    } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        name,
        email: userEmail,
        photoUrl: photo_url ? photo_url : '',
      },
      {
        sign: {
          sub: id,
        },
      },
    )

    return reply.status(200).send(token)
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
