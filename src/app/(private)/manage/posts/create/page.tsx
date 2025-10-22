'use client'
import {useState, useActionState, use} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TextareaAutosize from 'react-textarea-autosize';
import "highlight.js/styles/github.css";
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPost } from '@/lib/actions/createPost';

const CreatePage = () => {
  const [content, setContent] = useState('');
  const [contentLength, setContetLength] = useState(0);
  const [preview, setPreview] = useState(false);
  const [state, formAction] = useActionState(createPost, {
    success: false, errors: {}
  })
  const handleContentChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
    setContetLength(value.length)
  }

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>新規記事投稿</h1>
      <form action={formAction} className='space-y-4'>
        {state.errors.title && (
          <p className="text-red-500 text-sm mt-1">{state.errors.title.join(',')}</p>
        )}
        <div>
          <Label htmlFor='title'>タイトル</Label>
          <Input 
            type='text' 
            id='title' 
            name='title' 
            placeholder='タイトルを入力してください' 
          />
        </div>
        {state.errors.topImage && (
          <p className="text-red-500 text-sm mt-1">{state.errors.topImage.join(',')}</p>
        )}
        <div>
          <Label htmlFor='topImage'>トップ画像</Label>
          <Input 
            type='file'
            id='topImage'
            name='topImage'
            accept='image/*'
          />
        </div>
        <div>
          <Label htmlFor='content'>内容</Label>
          <TextareaAutosize 
            id='content'
            name='content'
            className='w-full border p-2'
            placeholder='マークダウン形式で入力してください'
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
        </div>
        {state.errors.content && (
          <p className="text-red-500 text-sm mt-1">{state.errors.content.join(',')}</p>
        )}
        <div className='text-right text-sm text-gray-500 mt-1'>
          文字数: {contentLength}
        </div>
        <div>
          <Button type='button' onClick={() => {setPreview(!preview)}}>
            {preview ? "プレビューを閉じる": "プレビューを表示"}
          </Button>
        </div>
        {preview && (
          <div className='border p-4 bg-gray-50 prose max-w-none'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml= {false}
              unwrapDisallowed={true}
            >{content}</ReactMarkdown>
          </div>
        )}
        <Button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>投稿する</Button>
      </form>
    </div>
  )
}

export default CreatePage