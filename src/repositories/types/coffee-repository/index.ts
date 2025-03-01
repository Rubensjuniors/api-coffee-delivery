import { Coffee, Prisma } from '@prisma/client'

export interface CoffeeRepository {
  findById(id: string): Promise<Coffee | null>
  findAll(): Promise<Coffee[]>
  create(data: Prisma.CoffeeCreateInput): Promise<Coffee>
  update(id: string, data: Prisma.CoffeeUpdateInput): Promise<Coffee>
  delete(id: string): Promise<void>
}
