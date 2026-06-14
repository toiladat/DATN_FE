import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from '@/components/providers/ThemeProvider'

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
  const { theme } = useTheme()

  // Determine dark mode state reactively
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <Editor
        apiKey="c220ly1jvkrcbheznqkakz5o83iy0tdqp1rj73j9tlijqtdq"
        onInit={(evt, editor) => {
          editorRef.current = editor
        }}
        value={value}
        onEditorChange={(content) => {
          if (onChange) {
            onChange(content)
          }
        }}
        init={{
          height: height,
          menubar: false,
          skin: isDark ? 'oxide-dark' : 'oxide',
          content_css: isDark ? 'dark' : 'default',
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
          content_style: `body { font-family: "Space Grotesk", Helvetica, Arial, sans-serif; font-size:16px; background-color: ${isDark ? '#10131a' : '#ffffff'}; color: ${isDark ? '#ecedf6' : '#0b0e14'}; border: none; }`,
          statusbar: false
        }}
      />
    </div>
  )
}
