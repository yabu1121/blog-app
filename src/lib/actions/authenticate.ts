'use server';

import { signIn } from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    });

    if (result?.error) {
      return 'メールアドレスまたはパスワードが正しくありません';
    }

    // 認証成功時は成功メッセージを返す（リダイレクトはクライアント側で処理）
    return 'success';
  } catch (error) {
    console.error('Authentication error:', error);
    return 'エラーが発生しました。';
  }
}