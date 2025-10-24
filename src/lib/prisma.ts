import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { //TODO globalThis
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient() //TODO ??
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
