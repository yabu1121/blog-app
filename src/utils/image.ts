import { writeFile } from 'fs/promises'
import path from 'path'
import { supabase } from '@/lib/supabase'

// TODO ここから

export const saveImage = async (file: File): Promise<string | null> => {
  const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === 'true';
  if(useSupabase){
    return await saveImageToSupabase(file)
  }else{
    return await saveImageToLocal(file)
  }
}

export const saveImageToLocal = async (file: File): Promise<string | null> => {
  const buffer = Buffer.from(await file.arrayBuffer())
  const fileName = `${Date.now()}_${file.name}`
  const uploadDir = path.join(process.cwd(), 'public/images')

  try {
    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, buffer,)
    return `/images/${fileName}`
  } catch (error) {
    console.error("画像保存エラー:", error)
    return null
  }
}

export const saveImageToSupabase = async (file: File): Promise<string | null> => {
  const fileName = `${Date.now()}_${file.name}`;
  const {data, error} = await supabase.storage
  .from('blog_app_bucket')
  .upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if(error){
    console.log('アップロードエラー : ',error.message);
    return null;
  }

  const {data : publicUrlData} = supabase.storage
  .from('blog_app_bucket')
  .getPublicUrl(fileName);

  return publicUrlData.publicUrl

}