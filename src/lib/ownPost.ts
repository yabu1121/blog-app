import { prisma } from '@/lib/prisma'

export const getOwnPost = async (userId: string, postId: string) => {
  return await prisma.post.findFirst({
    where: {
      AND: [
        { authorId: userId },
        { id: postId }
      ]
    },
    select: {
      id: true,
      title: true,
      content: true,
      topImage: true,
      author: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export const getOwnPosts = async (userId: string) => {
  return await prisma.post.findMany({
    where: {
      authorId: userId
    },
    select: {
      id: true,
      title: true,
      published: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc"
    }
  })
}