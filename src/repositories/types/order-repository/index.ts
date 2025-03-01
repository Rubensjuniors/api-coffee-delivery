import { Order, Prisma } from '@prisma/client'

export interface OrderRepository {
  create(userId: string, data: Prisma.OrderCreateInput): Promise<Order>
  findById(id: string): Promise<Order | null>
}
