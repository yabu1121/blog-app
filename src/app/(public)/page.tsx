import { getPosts, searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { Post } from "@/types/post"

type SearchParams = {
  search?: string
}

const PostsPage = async ({searchParams}: {searchParams: Promise<SearchParams>}) => {
  const resolvedSearchParams = await searchParams // errorが起こるから二段階で処理を行う。
  const query = resolvedSearchParams.search || '' //空で入ることもある

  const posts = query
  ? await searchPosts(query) as Post[]
  : await getPosts() as Post[];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map ((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default PostsPage