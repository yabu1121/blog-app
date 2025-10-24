export type Post = {
  id: string
  title: string
  content?: string
  topImage?: string
  createdAt?: Date
  published?: boolean
  updatedAt?: Date
  author?: {
    name: string
  }
}

export type PostCardProps = { post: Post }