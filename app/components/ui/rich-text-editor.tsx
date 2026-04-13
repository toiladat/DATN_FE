import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface RichTextEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  height?: number
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  height = 300
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null)

  return (
    <div className="rounded-xl overflow-hidden border border-[#45484f]/15 bg-[#161a21]">
      <Editor
        apiKey="c220ly1jvkrcbheznqkakz5o83iy0tdqp1rj73j9tlijqtdq"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        onEditorChange={(content, editor) => {
          if (onChange) {
            onChange(content)
          }
        }}
        init={{
          height: height,
          menubar: false,
          skin: 'oxide-dark',
          content_css: 'dark',
          placeholder: placeholder,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family: "Space Grotesk", Helvetica, Arial, sans-serif; font-size:16px; background-color: #10131a; color: #ecedf6; border: none; }',
          statusbar: false
        }}
      />
    </div>
  )
}
