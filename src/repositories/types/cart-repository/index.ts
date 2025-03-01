import { Cart, CartItem, Prisma } from '@prisma/client'

export interface CartRepository {
  findById(userId: string): Promise<Cart | null>
  addItem(userId: string, data: Prisma.CartItemCreateInput): Promise<CartItem>
  removeItem(itemId: string): Promise<void>
  clearCart(userId: string): Promise<void>
}
