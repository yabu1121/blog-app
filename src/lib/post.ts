import { prisma } from "@/lib/prisma"

export const getPosts = async () => {
  return await prisma.post.findMany({
    where: { pubulished: true },
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const getPost = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id },
    include : {
      author : {
        select : {
          name: true
        }
      }
    }
  })
} 

export const searchPosts = async (search:string) => { //引数search をstringとして記述。
  const decodedSearch = decodeURIComponent(search) //TODO decodeURIComponent とは
  const normalizedSearch = decodedSearch.replace(/[\s　]+/g,'').trim() //TODO .replace(/[\s ]+/g,'').trim()なにこれ
  const searchWords = normalizedSearch.split('').filter(Boolean) //TODO split, filter
  
  const filters = searchWords.map(word => ({
    OR:[{title: {contains: word}}, {content:{contains: word}},]//TODO ORとは
  }))

  return await prisma.post.findMany({
    where: {AND: filters},
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
