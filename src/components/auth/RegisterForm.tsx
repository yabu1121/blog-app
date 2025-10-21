'use client'
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useActionState } from "react"
import { createUser } from "@/lib/actions/createUser"


const RegisterForm = () => {
  const [state, formAction] = useActionState(createUser, {
    success: false, errors: {}
  })
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>ユーザ登録</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input id="name" type="text" name="name" required/>
            {state.errors?.name && (
              <p className="text-red-500 text-sm mt-1">{state.errors.name.join(',')}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" name="email" required/>
            {state.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{state.errors.email.join(',')}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" type="password" name="password" required/>
            {state.errors?.password && (
              <p className="text-red-500 text-sm mt-1">{state.errors.password.join(',')}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">パスワード(確認用)</Label>
            <Input id="confirmPassword" type="password" name="confirmPassword" required/>
            {state.errors?.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{state.errors.confirmPassword.join(',')}</p>
            )}
          </div>
          <Button type="submit" className="w-full">登録</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default RegisterForm