//ダミーデータを作るためのファイル
import bcrypt from "bcryptjs";

const { PrismaClient } = require("../src/generated/prisma");
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient()

const main = async () => {
  // clean up 
  await prisma.user.deleteMany()
  await prisma.post.deleteMany()

  const hashedPassword = await bcrypt.hash('password123', 12);
  const dummyImage = [
    'https://picsum.photos/seed/post1/600/400',
    'https://picsum.photos/seed/post2/600/400',
  ]

  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'user1',
      password: hashedPassword,
      posts: {
        create: [
          {
            title: 'first blog',
            content: '最初の投稿です。',
            topImage: dummyImage[0],
            published: true,
          },
          {
            title: 'second blog',
            content: '2個目の投稿です。どうもこんにちは',
            topImage: dummyImage[1],
            published: true,
          },
        ]
      }

    }
  })
  console.log({ user })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

