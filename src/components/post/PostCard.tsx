import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PostCardProps } from "@/types/post"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import Image from "next/image"

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <Link href={`/posts/${post.id}`} className="block">
        {post.topImage && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {post.content}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
            <span className="font-medium">{post.author?.name || '不明'}</span>
            <time className="text-muted-foreground/80">
              {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ja }) : '日付不明'}
            </time>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

export default PostCard