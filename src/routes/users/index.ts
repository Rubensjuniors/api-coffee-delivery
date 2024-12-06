import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { getUserProfile } from '@/controllers/getUserProfile'
import { register } from '@/controllers/register'

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
        }),
        response: {
          201: z.object({}),
          409: z.object({ message: z.string() }),
        },
      },
    },
    register,
  )
  app.get(
    '/users/:id',
    {
      schema: {
        tags: ['Users'],
        operationId: 'getUser',
        description: 'Get User.',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            password_hash: z.string(),
            photo_url: z.string(),
            created_at: z.date(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    getUserProfile,
  )
}
