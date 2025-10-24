import { getOwnPost } from "@/lib/ownPost";
import { notFound } from "next/navigation";
import { ja } from 'date-fns/locale'
import { format } from 'date-fns';
import Image from "next/image"
import { auth } from "@/auth";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"




type Params = {
  params: Promise<{ id: string }>
}

const ShowPage = async ({ params }: Params) => {
  const session = await auth();
  const userId = session?.user?.id

  if (!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです')
  }
  const { id } = await params;
  const post = await getOwnPost(userId, id)
  if (!post) {
    notFound()
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        {post.topImage && (
          <div className="relative w-full h-64 lg:h-96">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">投稿者 : {post.author?.name || '不明'}</p>
            <time className="text-sm text-gray-500">{post.createdAt ? format(new Date(post.createdAt), 'yyyy年MM月dd日', { locale: ja }) : '日付不明'}</time>
          </div>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='prose max-w-none'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >{post.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ShowPage