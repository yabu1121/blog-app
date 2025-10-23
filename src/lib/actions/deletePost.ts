'use server'
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

type ActionState = {
  success : boolean;
  errors : Record<string, string[]>
}

export const deletePost = async (postId : string): Promise<ActionState>=> {
  await prisma.post.delete({
    where : { id : postId }
  })
  redirect("/dashboard")
}