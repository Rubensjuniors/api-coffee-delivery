import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { authenticate } from '@/controllers/authenticare'
import { profile } from '@/controllers/profile'
import { register } from '@/controllers/register'
import { verifyJWT } from '@/middlewares/verify-jwt'

export const user: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        operationId: 'createUser',
        description: 'Create user.',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
          photourl: z.string().optional(),
        }),
        response: {
          201: z.object({}),
          409: z.object({ message: z.string() }),
        },
      },
    },
    register,
  )
  app.post(
    '/sessions',
    {
      schema: {
        tags: ['Users'],
        operationId: 'sessionsUser',
        description: 'Authenticate user.',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.string(),
          400: z.object({ message: z.string() }),
        },
      },
    },
    authenticate,
  )

  /** Authenticated */
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Users'],
        operationId: 'getUser',
        description: 'Get User when authenticated.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            photo_url: z.string(),
            created_at: z.date(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    profile,
  )
}
