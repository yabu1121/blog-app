'use server'

import { registerSchema } from "@/validations/user"
import { prisma } from "../prisma"
import bcryptjs from "bcryptjs"
import { signIn } from "@/auth"
import { redirect } from "next/navigation"

type ActionState = {
  success: boolean,
  errors: Record<string, string[]>
}

// バリデーションエラー処理
const handleValidationError = (error: { flatten: () => { fieldErrors: Record<string, string[]>; formErrors: string[] } }): ActionState => {
  const { fieldErrors, formErrors } = error.flatten();
  const errors = { ...fieldErrors };
  if (formErrors.length > 0) {
    errors.confirmPassword = formErrors;
  }
  return { success: false, errors };
};

//　カスタムエラー処理
const handleError = (customErrors: Record<string, string[]>): ActionState => {
  return { success: false, errors: customErrors };
}


export const createUser = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  //フォームからわたってきた情報を取得
  const rawFormData = Object.fromEntries(
    ["name", "email", "password", "confirmPassword"].map((field) => [
      field,
      formData.get(field) as string
    ])
  ) as Record<string, string>

  //バリデーション
  const validationResult = registerSchema.safeParse(rawFormData)
  if (!validationResult.success) {
    return handleValidationError(validationResult.error)
  }

  //DBにメールアドレスが存在しているか
  const existingUser = await prisma.user.findUnique({
    where: { email: rawFormData.email }
  })

  if (existingUser) {
    return handleError({ email: ["このメールアドレスは既に登録されています。"] })
  }

  //DBに登録
  const hashedPassword = await bcryptjs.hash(rawFormData.password, 12)
  await prisma.user.create({
    data: {
      name: rawFormData.name,
      email: rawFormData.email,
      password: hashedPassword,
    }
  })

  //dashboardにリダイレクト
  await signIn("credentials", {
    ...Object.fromEntries(formData),
    redirect: false
  })
  redirect("/dashboard")

  // redirect()の後には到達しないが、TypeScriptの型チェックのために追加
  return { success: true, errors: {} }
}