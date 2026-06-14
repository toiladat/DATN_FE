import { useState, useRef, useCallback } from 'react'
import { useLaunchProject } from '@/contexts/LaunchProjectContext'
import { useTranslation } from 'react-i18next'
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
  const { t, i18n } = useTranslation()
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
        toast.error(t('toast.unsupported_file', { name: file.name }))
        return false
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(
          t('toast.file_size_exceeded', { name: file.name, max: MAX_SIZE_MB })
        )
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
        toast.error(t('toast.max_files_exceeded', { max: MAX_FILES }))
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
        toast.error(t('toast.presign_failed'))
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
            toast.error(t('toast.upload_single_failed', { name: file.name }))
          }
        })
      )

      // Remove completed from uploading, add to attachments
      setUploadingFiles((prev) =>
        prev.filter((u) => !newUploading.find((n) => n.id === u.id))
      )
      if (uploadedAttachments.length > 0) {
        setAttachments([...attachments, ...uploadedAttachments])
        const count = uploadedAttachments.length
        let successMsg = ''
        if (i18n.language === 'vi') {
          successMsg =
            count === 1
              ? t('toast.upload_success_vi_1')
              : t('toast.upload_success_vi_many', { count })
        } else {
          successMsg =
            count === 1
              ? t('toast.upload_success_en_1')
              : t('toast.upload_success_en_many', { count })
        }
        toast.success(successMsg)
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
      toast.error(t('attachments.editTypeNameRequired'))
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
        <h1 className="text-5xl font-['Space_Grotesk'] font-bold tracking-tight text-foreground mb-4">
          {t('attachments.title')}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {t('attachments.desc')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Upload Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category + Description selectors */}
          <div className="bg-card border border-border rounded-none p-5 space-y-4">
            <div>
              <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-muted-foreground mb-2">
                {t('attachments.category')}
              </Label>
              <Select
                value={pendingCategory}
                onValueChange={(v) =>
                  setPendingCategory(v as AttachmentCategory)
                }
              >
                <SelectTrigger className="w-full bg-background border border-border rounded-none text-foreground focus:ring-1 focus:ring-neon-cyan/50 h-11 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border text-foreground rounded-none">
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
                <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-muted-foreground mb-2">
                  {t('attachments.typeName')}{' '}
                  <span className="normal-case tracking-normal text-neon-rose">
                    *
                  </span>
                </Label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-base pointer-events-none">
                    edit
                  </span>
                  <Input
                    className="w-full bg-background border border-border rounded-none text-foreground placeholder:text-muted-foreground/50 h-11 pl-9 pr-4 focus-visible:ring-1 focus-visible:ring-neon-cyan/50 shadow-none"
                    placeholder={t('attachments.typeNamePlaceholder')}
                    value={pendingCustomName}
                    onChange={(e) => setPendingCustomName(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
            )}

            <div>
              <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-muted-foreground mb-2">
                {t('attachments.description')}{' '}
                <span className="normal-case tracking-normal text-muted-foreground/60">
                  ({t('common.optional')})
                </span>
              </Label>
              <Input
                className="w-full bg-background border border-border rounded-none text-foreground placeholder:text-muted-foreground/50 h-11 px-4 focus-visible:ring-1 focus-visible:ring-neon-cyan/50 shadow-none"
                placeholder={t('attachments.descriptionPlaceholder')}
                value={pendingDescription}
                onChange={(e) => setPendingDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Drop Zone */}
          <div
            className={`relative rounded-none border-2 border-dashed transition-all duration-200 cursor-pointer
              ${
                isDragging
                  ? 'border-neon-cyan bg-neon-cyan/5 scale-[1.01]'
                  : 'border-border bg-card hover:border-neon-cyan/45 hover:bg-neon-cyan/5'
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
                className={`w-16 h-16 rounded-none border border-border/30 flex items-center justify-center mb-4 transition-all
                  ${isDragging ? 'bg-neon-cyan/20 scale-110' : 'bg-background'}`}
              >
                <span
                  className={`material-symbols-outlined text-3xl transition-colors
                    ${isDragging ? 'text-neon-cyan' : 'text-muted-foreground/60'}`}
                >
                  cloud_upload
                </span>
              </div>
              <p className="text-foreground font-['Space_Grotesk'] font-semibold mb-1">
                {isDragging
                  ? t('attachments.dropHere')
                  : t('attachments.dragDrop')}
              </p>
              <p className="text-muted-foreground/60 text-sm">
                {t('attachments.orBrowse', { browse: t('attachments.browse') })}
              </p>
              <p className="text-muted-foreground/60 text-xs mt-4">
                {t('attachments.constraints', { max: MAX_SIZE_MB })}
              </p>
              <div className="mt-3 px-3 py-1 rounded-none bg-background text-[10px] text-muted-foreground font-mono">
                {t('attachments.filesUsed', {
                  count: totalFiles,
                  max: MAX_FILES
                })}
              </div>
            </div>
          </div>

          {/* In-progress uploads */}
          {uploadingFiles.length > 0 && (
            <div className="space-y-2">
              {uploadingFiles.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-3 bg-card rounded-none border border-border"
                >
                  <span className="material-symbols-outlined text-neon-cyan text-lg animate-spin">
                    progress_activity
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground truncate">
                      {u.file.name}
                    </p>
                    {u.error ? (
                      <p className="text-xs text-neon-rose">{u.error}</p>
                    ) : (
                      <div className="mt-1 h-1 bg-background rounded-none overflow-hidden">
                        <div
                          className="h-full bg-neon-cyan rounded-none transition-all"
                          style={{ width: `${u.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/60">
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 rounded-none blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-card rounded-none border border-border overflow-hidden">
                  {editingIndex === index ? (
                    /* Edit mode */
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-neon-cyan text-lg">
                          edit_note
                        </span>
                        <span className="text-xs text-muted-foreground truncate font-mono">
                          {att.url.split('/').pop()}
                        </span>
                      </div>
                      <Select
                        value={editCategory}
                        onValueChange={(v) =>
                          setEditCategory(v as AttachmentCategory)
                        }
                      >
                        <SelectTrigger className="w-full bg-background border border-border rounded-none text-foreground h-10 shadow-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border border-border text-foreground rounded-none">
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
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                            edit
                          </span>
                          <Input
                            className="w-full bg-background border border-border rounded-none text-foreground placeholder:text-muted-foreground/50 h-10 pl-9 pr-4 focus-visible:ring-1 focus-visible:ring-neon-cyan/50 shadow-none text-sm"
                            placeholder={t('attachments.typeNamePlaceholder')}
                            value={editCustomName}
                            onChange={(e) => setEditCustomName(e.target.value)}
                            autoFocus
                          />
                        </div>
                      )}
                      <Input
                        className="w-full bg-background border border-border rounded-none text-foreground placeholder:text-muted-foreground/50 h-10 px-4 focus-visible:ring-1 focus-visible:ring-neon-cyan/50 shadow-none"
                        placeholder={t('attachments.descriptionPlaceholder')}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          className="flex-1 h-8 bg-neon-cyan hover:bg-neon-cyan/80 text-background font-bold rounded-none border border-neon-cyan shadow-[1px_1px_0px_0px_var(--neon-purple)] text-xs"
                        >
                          {t('btn.save')}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingIndex(null)}
                          className="flex-1 h-8 text-muted-foreground hover:text-foreground rounded-none text-xs"
                        >
                          {t('btn.cancel')}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* View mode */
                    <div className="flex items-center gap-4 p-4">
                      {/* File type icon */}
                      <div
                        className="w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0"
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
                          <p className="text-sm font-['Space_Grotesk'] font-semibold text-foreground truncate">
                            {att.category === 'Other' && att.customCategoryName
                              ? att.customCategoryName
                              : att.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {att.description && (
                            <span className="text-muted-foreground text-xs italic truncate max-w-[180px]">
                              {att.description}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEdit(index)}
                          className="p-2 text-muted-foreground/60 hover:text-neon-purple transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => removeAttachment(index)}
                          className="p-2 text-muted-foreground/60 hover:text-neon-rose transition-colors"
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
              <div className="relative p-14 bg-muted/10 rounded-none border border-dashed border-border flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-muted-foreground/60 mb-4">
                  folder_open
                </span>
                <p className="text-muted-foreground text-sm italic">
                  {t('attachments.empty')}
                </p>
                <p className="text-muted-foreground/60 text-xs mt-1">
                  {t('attachments.emptySub')}
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-bold"
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
        continueText={t('attachments.completeSetup')}
      />
    </div>
  )
}
