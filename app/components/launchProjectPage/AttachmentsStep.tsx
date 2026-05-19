import { useState, useRef, useCallback } from 'react'
import { useLaunchProject } from '@/contexts/LaunchProjectContext'
import type {
  Attachment,
  AttachmentCategory
} from '@/contexts/LaunchProjectContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ActionFooter } from './ActionFooter'
import { toast } from 'sonner'
import mediaRequests from '@/apis/requests/media'

interface AttachmentsStepProps {
  onStepChange?: (step: string) => void
}

const ACCEPTED_TYPES = [
  // Images
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  // Documents
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
]

const MAX_SIZE_MB = 10
const MAX_FILES = 10

const CATEGORIES: AttachmentCategory[] = [
  'Certificate',
  'Portfolio',
  'Resume',
  'Business Plan',
  'Patent',
  'Other'
]

const CATEGORY_ICONS: Record<AttachmentCategory, string> = {
  Certificate: 'workspace_premium',
  Portfolio: 'photo_library',
  Resume: 'description',
  'Business Plan': 'business_center',
  Patent: 'verified',
  Other: 'attach_file'
}

const CATEGORY_COLORS: Record<AttachmentCategory, string> = {
  Certificate: '#fbbf24',
  Portfolio: '#8ff5ff',
  Resume: '#ac89ff',
  'Business Plan': '#4ade80',
  Patent: '#f97316',
  Other: '#a9abb3'
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType === 'application/pdf') return 'picture_as_pdf'
  if (
    mimeType === 'application/msword' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
    return 'article'
  return 'insert_drive_file'
}

interface UploadingFile {
  id: string
  file: File
  progress: number
  error?: string
}

export function AttachmentsStep({ onStepChange }: AttachmentsStepProps = {}) {
  const { project, setAttachments } = useLaunchProject()
  const { attachments } = project

  const [isDragging, setIsDragging] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [pendingCategory, setPendingCategory] =
    useState<AttachmentCategory>('Certificate')
  const [pendingCustomName, setPendingCustomName] = useState('')
  const [pendingDescription, setPendingDescription] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editCategory, setEditCategory] =
    useState<AttachmentCategory>('Certificate')
  const [editCustomName, setEditCustomName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const validateFiles = (files: File[]): File[] => {
    return files.filter((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error(
          `${file.name}: Unsupported file type. Use JPG, PNG, WEBP, GIF, or PDF.`
        )
        return false
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name}: File exceeds ${MAX_SIZE_MB}MB limit.`)
        return false
      }
      return true
    })
  }

  const uploadFiles = useCallback(
    async (files: File[]) => {
      const valid = validateFiles(files)
      if (!valid.length) return

      // We no longer block if pendingCustomName is empty. We will fallback to file.name below.

      const remaining = MAX_FILES - attachments.length - uploadingFiles.length
      if (valid.length > remaining) {
        toast.error(`You can only upload ${MAX_FILES} files total.`)
        return
      }

      const newUploading: UploadingFile[] = valid.map((file) => ({
        id: `${Date.now()}-${file.name}`,
        file,
        progress: 0
      }))
      setUploadingFiles((prev) => [...prev, ...newUploading])

      // Get presigned URLs
      let presignedData: {
        uploadUrl: string
        fileUrl: string
        fileName: string
      }[] = []
      try {
        const result = await mediaRequests.presignUrls({
          info: { type: 'attachment' },
          files: valid.map((f) => ({
            filename: f.name,
            filetype: f.type,
            filesize: f.size
          }))
        })
        presignedData = result.data
      } catch {
        toast.error('Failed to get upload URLs. Please try again.')
        setUploadingFiles((prev) =>
          prev.filter((u) => !newUploading.find((n) => n.id === u.id))
        )
        return
      }

      // Upload each file
      const uploadedAttachments: Attachment[] = []
      await Promise.all(
        valid.map(async (file, i) => {
          const { uploadUrl, fileUrl } = presignedData[i]
          const uploadingEntry = newUploading[i]
          try {
            await mediaRequests.uploadToPresignedUrl(file, uploadUrl, (pct) => {
              setUploadingFiles((prev) =>
                prev.map((u) =>
                  u.id === uploadingEntry.id ? { ...u, progress: pct } : u
                )
              )
            })
            uploadedAttachments.push({
              url: fileUrl,
              category: pendingCategory,
              customCategoryName:
                pendingCategory === 'Other'
                  ? pendingCustomName.trim() || file.name
                  : undefined,
              description: pendingDescription.trim() || undefined
            })
          } catch {
            setUploadingFiles((prev) =>
              prev.map((u) =>
                u.id === uploadingEntry.id
                  ? { ...u, error: 'Upload failed' }
                  : u
              )
            )
            toast.error(`Failed to upload ${file.name}.`)
          }
        })
      )

      // Remove completed from uploading, add to attachments
      setUploadingFiles((prev) =>
        prev.filter((u) => !newUploading.find((n) => n.id === u.id))
      )
      if (uploadedAttachments.length > 0) {
        setAttachments([...attachments, ...uploadedAttachments])
        toast.success(
          `${uploadedAttachments.length} file${uploadedAttachments.length > 1 ? 's' : ''} uploaded successfully.`
        )
      }
    },
    [
      attachments,
      uploadingFiles.length,
      pendingCategory,
      pendingCustomName,
      pendingDescription,
      setAttachments
    ]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files)
      uploadFiles(files)
    },
    [uploadFiles]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    uploadFiles(files)
    // Reset input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = ''
  }

  const removeAttachment = (index: number) => {
    const target = attachments[index]
    // Optimistic update — remove from state immediately
    const updated = attachments.filter((_, i) => i !== index)
    setAttachments(updated)
    // Fire-and-forget delete on R2
    mediaRequests.deleteFile(target.url).catch((err) => {
      console.error('Failed to delete file from R2:', err)
    })
  }

  const startEdit = (index: number) => {
    setEditingIndex(index)
    setEditCategory(attachments[index].category)
    setEditCustomName(attachments[index].customCategoryName || '')
    setEditDescription(attachments[index].description || '')
  }

  const saveEdit = () => {
    if (editingIndex === null) return
    if (editCategory === 'Other' && !editCustomName.trim()) {
      toast.error('Please enter a name for this attachment type.')
      return
    }
    const updated = attachments.map((a, i) =>
      i === editingIndex
        ? {
            ...a,
            category: editCategory,
            customCategoryName:
              editCategory === 'Other' && editCustomName.trim()
                ? editCustomName.trim()
                : undefined,
            description: editDescription.trim() || undefined
          }
        : a
    )
    setAttachments(updated)
    setEditingIndex(null)
  }

  const totalFiles = attachments.length + uploadingFiles.length

  return (
    <div className="max-w-6xl mx-auto pb-32">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-['Space_Grotesk'] font-bold tracking-tight text-[#ecedf6] mb-4">
          Credentials & Proof
        </h1>
        <p className="text-[#a9abb3] text-lg max-w-2xl">
          Upload supporting documents — certificates, portfolios, CVs, or
          business plans. These attachments help investors verify your team's
          expertise and build confidence.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Upload Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category + Description selectors */}
          <div className="bg-[#10131a] border border-[#45484f]/20 rounded-xl p-5 space-y-4">
            <div>
              <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                Category
              </Label>
              <Select
                value={pendingCategory}
                onValueChange={(v) =>
                  setPendingCategory(v as AttachmentCategory)
                }
              >
                <SelectTrigger className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] focus:ring-1 focus:ring-[#8ff5ff]/50 h-11 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#22262f] border-[#45484f]/30 text-[#ecedf6]">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      <span className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-base"
                          style={{ color: CATEGORY_COLORS[cat] }}
                        >
                          {CATEGORY_ICONS[cat]}
                        </span>
                        {cat}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom name — only shown when Other is selected */}
            {pendingCategory === 'Other' && (
              <div>
                <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                  Type Name{' '}
                  <span className="normal-case tracking-normal text-[#ff716c]">
                    *
                  </span>
                </Label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a9abb3] text-base pointer-events-none">
                    edit
                  </span>
                  <Input
                    className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] placeholder:text-slate-600 h-11 pl-9 pr-4 focus-visible:ring-1 focus-visible:ring-[#8ff5ff]/50 shadow-none"
                    placeholder="e.g. Award, Press Coverage, Demo..."
                    value={pendingCustomName}
                    onChange={(e) => setPendingCustomName(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
            )}

            <div>
              <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                Description{' '}
                <span className="normal-case tracking-normal text-[#45484f]">
                  (optional)
                </span>
              </Label>
              <Input
                className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] placeholder:text-slate-600 h-11 px-4 focus-visible:ring-1 focus-visible:ring-[#8ff5ff]/50 shadow-none"
                placeholder="e.g. AWS Solutions Architect 2024..."
                value={pendingDescription}
                onChange={(e) => setPendingDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Drop Zone */}
          <div
            className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer
              ${
                isDragging
                  ? 'border-[#8ff5ff] bg-[#8ff5ff]/5 scale-[1.01]'
                  : 'border-[#45484f]/40 bg-[#0d1017] hover:border-[#8ff5ff]/40 hover:bg-[#8ff5ff]/5'
              }
              ${totalFiles >= MAX_FILES ? 'opacity-50 pointer-events-none' : ''}
            `}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPTED_TYPES.join(',')}
              className="hidden"
              onChange={handleInputChange}
            />
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all
                  ${isDragging ? 'bg-[#8ff5ff]/20 scale-110' : 'bg-[#1c2028]'}`}
              >
                <span
                  className={`material-symbols-outlined text-3xl transition-colors
                    ${isDragging ? 'text-[#8ff5ff]' : 'text-[#45484f]'}`}
                >
                  cloud_upload
                </span>
              </div>
              <p className="text-[#ecedf6] font-['Space_Grotesk'] font-semibold mb-1">
                {isDragging ? 'Drop files here' : 'Drag & drop files'}
              </p>
              <p className="text-[#45484f] text-sm">
                or <span className="text-[#8ff5ff]">browse</span> to upload
              </p>
              <p className="text-[#45484f] text-xs mt-4">
                JPG · PNG · WEBP · GIF · PDF · DOC · DOCX — max {MAX_SIZE_MB}MB
                each
              </p>
              <div className="mt-3 px-3 py-1 rounded-full bg-[#1c2028] text-[10px] text-[#a9abb3] font-mono">
                {totalFiles}/{MAX_FILES} files used
              </div>
            </div>
          </div>

          {/* In-progress uploads */}
          {uploadingFiles.length > 0 && (
            <div className="space-y-2">
              {uploadingFiles.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-3 bg-[#10131a] rounded-xl border border-[#45484f]/20"
                >
                  <span className="material-symbols-outlined text-[#8ff5ff] text-lg animate-spin">
                    progress_activity
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#ecedf6] truncate">
                      {u.file.name}
                    </p>
                    {u.error ? (
                      <p className="text-xs text-[#ff716c]">{u.error}</p>
                    ) : (
                      <div className="mt-1 h-1 bg-[#1c2028] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#8ff5ff] rounded-full transition-all"
                          style={{ width: `${u.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#45484f]">
                    {u.error ? '✗' : `${u.progress}%`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attachments List */}
        <div className="lg:col-span-7">
          <div className="space-y-3">
            {attachments.map((att, index) => (
              <div key={`${att.url}-${index}`} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-[#10131a] rounded-xl border border-white/5 overflow-hidden">
                  {editingIndex === index ? (
                    /* Edit mode */
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[#8ff5ff] text-lg">
                          edit_note
                        </span>
                        <span className="text-xs text-[#a9abb3] truncate font-mono">
                          {att.url.split('/').pop()}
                        </span>
                      </div>
                      <Select
                        value={editCategory}
                        onValueChange={(v) =>
                          setEditCategory(v as AttachmentCategory)
                        }
                      >
                        <SelectTrigger className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] h-10 shadow-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#22262f] border-[#45484f]/30 text-[#ecedf6]">
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {/* Custom name input — shown when Other is selected */}
                      {editCategory === 'Other' && (
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a9abb3] text-sm pointer-events-none">
                            edit
                          </span>
                          <Input
                            className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] placeholder:text-slate-600 h-10 pl-9 pr-4 focus-visible:ring-1 focus-visible:ring-[#8ff5ff]/50 shadow-none text-sm"
                            placeholder="Type name (required)..."
                            value={editCustomName}
                            onChange={(e) => setEditCustomName(e.target.value)}
                            autoFocus
                          />
                        </div>
                      )}
                      <Input
                        className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] placeholder:text-slate-600 h-10 px-4 focus-visible:ring-1 focus-visible:ring-[#8ff5ff]/50 shadow-none"
                        placeholder="Description..."
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          className="flex-1 h-8 bg-[#8ff5ff] hover:bg-[#a8f8ff] text-[#00383d] font-bold rounded-lg border-none text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingIndex(null)}
                          className="flex-1 h-8 text-[#a9abb3] hover:text-[#ecedf6] rounded-lg text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* View mode */
                    <div className="flex items-center gap-4 p-4">
                      {/* File type icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${CATEGORY_COLORS[att.category]}15`,
                          border: `1px solid ${CATEGORY_COLORS[att.category]}30`
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-2xl"
                          style={{ color: CATEGORY_COLORS[att.category] }}
                        >
                          {CATEGORY_ICONS[att.category]}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-['Space_Grotesk'] font-semibold text-[#ecedf6] truncate">
                            {att.category === 'Other' && att.customCategoryName
                              ? att.customCategoryName
                              : att.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {att.description && (
                            <span className="text-[#73757d] text-xs italic truncate max-w-[180px]">
                              {att.description}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEdit(index)}
                          className="p-2 text-[#45484f] hover:text-[#ac89ff] transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => removeAttachment(index)}
                          className="p-2 text-[#45484f] hover:text-[#ff716c] transition-colors"
                          title="Remove"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {attachments.length === 0 && uploadingFiles.length === 0 && (
              <div className="relative p-14 bg-black/20 rounded-xl border border-dashed border-[#45484f]/30 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-[#45484f] mb-4">
                  folder_open
                </span>
                <p className="text-[#a9abb3] text-sm italic">
                  No files uploaded yet.
                </p>
                <p className="text-[#45484f] text-xs mt-1">
                  This step is optional — but recommended.
                </p>
              </div>
            )}
          </div>

          {/* Summary stats */}
          {attachments.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {(Object.keys(CATEGORY_ICONS) as AttachmentCategory[]).map(
                (cat) => {
                  const count = attachments.filter(
                    (a) => a.category === cat
                  ).length
                  if (!count) return null
                  return (
                    <div
                      key={cat}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        background: `${CATEGORY_COLORS[cat]}15`,
                        border: `1px solid ${CATEGORY_COLORS[cat]}25`,
                        color: CATEGORY_COLORS[cat]
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '12px' }}
                      >
                        {CATEGORY_ICONS[cat]}
                      </span>
                      {count} {cat}
                    </div>
                  )
                }
              )}
            </div>
          )}
        </div>
      </div>

      <ActionFooter
        onContinue={() => onStepChange?.('Overview')}
        continueText="Complete Setup"
      />
    </div>
  )
}
