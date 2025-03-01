import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'
import { OrderRepository } from '@/repositories/types/order-repository'

export class PrismaOrderRepository implements OrderRepository {
  async create(userId: string, data: Prisma.OrderCreateInput) {
    return await prisma.order.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    })
  }

  async findById(id: string) {
    return await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    })
  }
}
