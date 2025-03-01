import { Coffee, Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'
import { CoffeeRepository } from '@/repositories/types/coffee-repository'

export class PrismaCoffeeRepository implements CoffeeRepository {
  async findById(id: string) {
    return await prisma.coffee.findUnique({
      where: { id },
    })
  }

  async findAll(): Promise<Coffee[]> {
    return await prisma.coffee.findMany()
  }

  async create(data: Prisma.CoffeeCreateInput): Promise<Coffee> {
    return await prisma.coffee.create({
      data
    })
  }

  async update(id: string, data: Prisma.CoffeeUpdateInput): Promise<Coffee> {
    return await prisma.coffee.update({
      where: { id },
      data
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.coffee.delete({
      where: { id }
    })
  }
}
