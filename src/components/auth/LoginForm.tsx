'use client'
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { authenticate } from "@/lib/actions/authenticate"
import Link from "next/link"

const LoginForm = () => {
  const router = useRouter()
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )

  useEffect(() => {
    if (errorMessage === 'success') {
      router.push('/dashboard')
    }
  }, [errorMessage, router])

  return (
    <Card>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "ログイン中..." : "ログイン"}
          </Button>
          <div className="text-center">
            <Link href="/register" className="text-sm text-blue-600 hover:underline">
              アカウントをお持ちでない方はこちら
            </Link>
          </div>
          <div
            className="flex h-8 items-end space-x-1"
          >
            {errorMessage && errorMessage !== 'success' && (
              <div className="text-red-500">
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm