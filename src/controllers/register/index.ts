import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/UserAlreadyExistsError'
import { makeRegisterUseCase } from '@/use-cases/factoties/make-register-user-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    photoUrl: z.string().optional(),
    roles: z.enum(['USER', 'ADMIN']).array().default(['USER']).optional(),
  })

  const { email, name, password, photoUrl, roles } = requestBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({
      name,
      email,
      password,
      photoUrl,
      roles,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
