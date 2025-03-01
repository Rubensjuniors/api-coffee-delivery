import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'
import { CartRepository } from '@/repositories/types/cart-repository'

export class PrismaCartRepository implements CartRepository {
  async findById(userId: string) {
    return await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    })
  }

  async addItem(userId: string, data: Prisma.CartItemCreateInput) {
    return await prisma.cartItem.create({
      data: {
        ...data,
        cart: { connect: { userId } },
      },
    })
  }

  async removeItem(itemId: string) {
    await prisma.cartItem.delete({
      where: { id: itemId },
    })
  }

  async clearCart(userId: string) {
    await prisma.cart.delete({
      where: { userId },
    })
  }
}
