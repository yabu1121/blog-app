'use client'
import {useState, useActionState, use, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TextareaAutosize from 'react-textarea-autosize';
import "highlight.js/styles/github.css";
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updatePost } from '@/lib/actions/updatePost';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type EditPostFormProps = {
  post : {
    id : string;
    title : string;
    content : string;
    topImage : string | null;
    published : boolean
  }
}

const EditPostForm = ({post} : EditPostFormProps) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [published, setPublished] = useState(post.published);
  const [contentLength, setContetLength] = useState(0);
  const [preview, setPreview] = useState(false);
  const [ImagePreview, setImagePreview] = useState(post.topImage);

  const [state, formAction] = useActionState(updatePost, {
    success: false, errors: {}
  })

  const handleContentChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
    setContetLength(value.length)
  }

  const handleImageChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  useEffect(() => {
    return () => {
      if(ImagePreview && ImagePreview !== post.topImage){
        URL.revokeObjectURL(ImagePreview)
      }
    }
  },[ImagePreview,post.topImage])

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='mb-4 text-2xl font-bold'>新規記事投稿</h1>
      <form action={formAction} className='space-y-4'>
        {state.errors.title && (
          <p className="mt-1 text-sm text-red-500">{state.errors.title.join(',')}</p>
        )}
        <div>
          <Label htmlFor='title'>タイトル</Label>
          <Input 
            type='text' 
            id='title' 
            name='title' 
            placeholder='タイトルを入力してください' 
            value={title} onChange={(e) => {setTitle(e.target.value)}}
          />
        </div>
        {state.errors.topImage && (
          <p className="mt-1 text-sm text-red-500">{state.errors.topImage.join(',')}</p>
        )}
        <div>
          <Label htmlFor='topImage'>トップ画像</Label>
          <Input 
            type='file'
            id='topImage'
            name='topImage'
            accept='image/*'
            onChange={handleImageChange}
          />
          {ImagePreview && (
            <div className='mt-2'>
              <Image 
                src={ImagePreview}
                alt={post.title}
                width={0}
                height={0}
                className="w-[200px]"
                priority
              />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor='content'>内容</Label>
          <TextareaAutosize 
            id='content'
            name='content'
            className='w-full p-2 border'
            placeholder='マークダウン形式で入力してください'
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
        </div>
        {state.errors.content && (
          <p className="mt-1 text-sm text-red-500">{state.errors.content.join(',')}</p>
        )}
        <div className='mt-1 text-sm text-right text-gray-500'>
          文字数: {contentLength}
        </div>
        <div>
          <Button type='button' onClick={() => {setPreview(!preview)}}>
            {preview ? "プレビューを閉じる": "プレビューを表示"}
          </Button>
        </div>
        {preview && (
          <div className='p-4 prose border bg-gray-50 max-w-none'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml= {false}
              unwrapDisallowed={true}
            >{content}</ReactMarkdown>
          </div>
        )}

        <RadioGroup value={published.toString()} name='published' onValueChange={(value) => setPublished(value === 'true')}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="published-one" />
            <Label htmlFor="published-one">表示</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="published-two" />
            <Label htmlFor="published-two">非表示</Label>
          </div>
        </RadioGroup>

        <Button type='submit' className='px-4 py-2 text-white bg-blue-500 rounded'>更新する</Button>
        <Input type='hidden' name='postId' value={post.id}/>
        <Input type='hidden' name='oldImageUrl' value={post.topImage || ""}/>
      </form>
    </div>
  )
}

export default EditPostForm