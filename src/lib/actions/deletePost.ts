'use server'
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

type ActionState = {
  success : boolean;
  errors : Record<string, string[]>
}

export const deletePost = async (postId : string): Promise<ActionState>=> {
  try {
    await prisma.post.delete({
      where : { id : postId }
    })
    redirect("/dashboard")
  } catch (error) {
    console.error('記事削除エラー:', error)
    return {success:false, errors:{ post : ["記事の削除に失敗しました"]}}
  }
}