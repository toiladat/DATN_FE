import { useState, useRef } from 'react'
import {
  Loader2,
  AlertTriangle,
  CheckCircle2,
  X,
  Images,
  Video
} from 'lucide-react'
import { toast } from 'sonner'
import { useUpdateMilestone } from '@/apis/queries/project'
import { ImageUpload } from '@/components/ui/image-upload'
import mediaRequests from '@/apis/requests/media'
import { useTranslation } from 'react-i18next'
import { getErrorMessage } from '@/lib/utils'

interface MilestoneUpdateFormProps {
  projectId: string
  milestoneId: string
  isLate: boolean
  existingUpdate?: {
    completed: string
    blockers: string
    video: string
    images: string[]
    link?: string
  } | null
  onClose: () => void
}

export function MilestoneUpdateForm({
  projectId,
  milestoneId,
  isLate,
  existingUpdate,
  onClose
}: MilestoneUpdateFormProps) {
  const { t } = useTranslation()
  const [completed, setCompleted] = useState(existingUpdate?.completed ?? '')
  const [blockers, setBlockers] = useState(existingUpdate?.blockers ?? '')
  const [link, setLink] = useState(existingUpdate?.link ?? '')

  // ── Images ───────────────────────────────────────────────────────────────
  const [imageUrls, setImageUrls] = useState<string[]>(
    existingUpdate?.images ?? []
  )
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [uploadedImageCache, setUploadedImageCache] = useState<
    Record<string, string>
  >({})

  const handleImagesChange = async (
    files: File[],
    remainingInitialUrls: string[] = []
  ) => {
    const currentKeys = files.map((f) => f.name + f.size)
    const newCache = { ...uploadedImageCache }

    Object.keys(newCache).forEach((key) => {
      if (!currentKeys.includes(key)) {
        mediaRequests.deleteFile(newCache[key]).catch(console.error)
        delete newCache[key]
      }
    })

    const filesToUpload = files.filter((f) => !newCache[f.name + f.size])
    if (filesToUpload.length > 0) {
      setIsUploadingImage(true)
      try {
        const urls = await mediaRequests.uploadFiles(filesToUpload, 'milestone')
        filesToUpload.forEach((f, idx) => {
          newCache[f.name + f.size] = urls[idx]
        })
      } catch {
        toast.error(t('updates.form.upload_failed'), {
          description: t('updates.form.upload_failed_desc')
        })
        throw new Error('upload failed')
      } finally {
        setIsUploadingImage(false)
      }
    }

    setUploadedImageCache(newCache)
    const activeUrls = files
      .map((f) => newCache[f.name + f.size])
      .filter(Boolean)
    setImageUrls([...remainingInitialUrls, ...activeUrls])
  }

  // ── Video ────────────────────────────────────────────────────────────────
  const [videoUrl, setVideoUrl] = useState(existingUpdate?.video ?? '')
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]

    if (file.size > 100 * 1024 * 1024) {
      toast.error(t('toast.video_too_large'), {
        description: t('toast.video_too_large_desc')
      })
      return
    }

    setIsUploadingVideo(true)
    try {
      const { data } = await mediaRequests.presignUrls({
        info: { type: 'milestone' },
        files: [
          { filename: file.name, filetype: file.type, filesize: file.size }
        ]
      })
      const uploadUrl = data[0].uploadUrl
      const finalUrl = data[0].fileUrl

      toast.info(t('toast.uploading_video'))
      await mediaRequests.uploadToPresignedUrl(file, uploadUrl)

      // Delete old video from storage if it was uploaded (not an external link)
      if (
        videoUrl &&
        videoUrl.startsWith('http') &&
        !videoUrl.includes('youtube')
      ) {
        mediaRequests.deleteFile(videoUrl).catch(console.error)
      }

      setVideoUrl(finalUrl)
      toast.success(t('toast.video_uploaded_success'))
    } catch {
      toast.error(t('toast.video_upload_failed'), {
        description: t('updates.form.try_again')
      })
    } finally {
      setIsUploadingVideo(false)
      if (videoInputRef.current) videoInputRef.current.value = ''
    }
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  const { mutate, isPending, isError, error } = useUpdateMilestone(projectId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!completed.trim()) return
    if (!videoUrl.trim()) return

    mutate(
      {
        projectId,
        milestoneId,
        completed: completed.trim(),
        blockers: blockers.trim(),
        images: imageUrls,
        video: videoUrl.trim(),
        link: link.trim() || undefined
      },
      {
        onSuccess: () => {
          toast.success(t('updates.form.success'))
          onClose()
        }
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Late warning */}
      {isLate && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#ff716c]/8 border border-[#ff716c]/25">
          <AlertTriangle className="w-4 h-4 text-[#ff716c] shrink-0 mt-0.5" />
          <p className="text-[#ff716c] text-[12px] leading-relaxed">
            {t('updates.form.late_warning')}
          </p>
        </div>
      )}

      {/* Completed field */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#a9abb3]">
          {t('updates.form.completed_label')}{' '}
          <span className="text-[#ff716c]">*</span>
        </label>
        <textarea
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
          rows={4}
          placeholder={t('updates.form.completed_placeholder')}
          required
          className="w-full bg-[#161a21] border border-[#2e323b]/60 rounded-xl px-4 py-3 text-[#ecedf6] text-sm placeholder:text-[#3a3e4a] focus:outline-none focus:border-[#8ff5ff]/50 transition-colors duration-200 resize-none font-['Space_Grotesk']"
        />
      </div>

      {/* Blockers field */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#a9abb3]">
          {t('updates.form.blockers_label')}
          <span className="text-[#73757d] ml-2 normal-case tracking-normal">
            {t('common.optional')}
          </span>
        </label>
        <textarea
          value={blockers}
          onChange={(e) => setBlockers(e.target.value)}
          rows={3}
          placeholder={t('updates.form.blockers_placeholder')}
          className="w-full bg-[#161a21] border border-[#2e323b]/60 rounded-xl px-4 py-3 text-[#ecedf6] text-sm placeholder:text-[#3a3e4a] focus:outline-none focus:border-[#8ff5ff]/50 transition-colors duration-200 resize-none font-['Space_Grotesk']"
        />
      </div>

      {/* Images */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#a9abb3]">
          <Images className="w-3.5 h-3.5" />
          {t('updates.form.images_label')}
          <span className="text-[#73757d] normal-case tracking-normal font-normal">
            {t('updates.form.images_helper')}
          </span>
        </label>
        <ImageUpload
          maxImages={4}
          initialPreviews={existingUpdate?.images ?? []}
          onImagesChange={handleImagesChange}
          onRemoveInitial={(url) => {
            const newCache = { ...uploadedImageCache }
            const keyToDelete = Object.keys(newCache).find(
              (k) => newCache[k] === url
            )
            if (keyToDelete) {
              delete newCache[keyToDelete]
              setUploadedImageCache(newCache)
            }
            mediaRequests.deleteFile(url).catch(console.error)
            setImageUrls((prev) => prev.filter((img) => img !== url))
          }}
        />
        {isUploadingImage && (
          <p className="text-[#8ff5ff] text-[11px] flex items-center gap-1.5">
            <Loader2 className="w-3 h-3 animate-spin" />
            {t('updates.form.uploading_images')}
          </p>
        )}
      </div>

      {/* Video upload */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#a9abb3]">
          <Video className="w-3.5 h-3.5" />
          {t('updates.form.video_label')}{' '}
          <span className="text-[#ff716c]">*</span>
        </label>

        {/* Clickable upload area */}
        <div
          onClick={() => !isUploadingVideo && videoInputRef.current?.click()}
          className="relative group/video cursor-pointer rounded-xl border border-[#2e323b]/60 hover:border-[#8ff5ff]/30 hover:bg-[#1c2028] transition-all bg-[#161a21] p-5 flex items-center gap-5"
        >
          <input
            type="file"
            accept="video/*"
            className="hidden"
            ref={videoInputRef}
            onChange={handleVideoChange}
          />
          <div className="w-12 h-12 rounded-full bg-[#22262f] flex items-center justify-center text-[#8ff5ff] group-hover/video:bg-[#8ff5ff]/15 transition-colors shrink-0">
            <Video className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#ecedf6] text-sm font-semibold">
              {videoUrl
                ? t('updates.form.video_selected')
                : t('updates.form.video_upload_label')}
            </p>
            <p className="text-[#73757d] text-[11px] mt-0.5">
              {isUploadingVideo
                ? t('updates.form.video_uploading')
                : videoUrl
                  ? t('updates.form.video_click_replace')
                  : t('updates.form.video_constraints')}
            </p>
          </div>
          <button
            type="button"
            disabled={isUploadingVideo}
            className="text-[10px] font-bold uppercase tracking-widest text-[#8ff5ff] border border-[#8ff5ff]/20 px-3 py-1.5 rounded-lg hover:bg-[#8ff5ff]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {isUploadingVideo ? (
              <span className="flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                {t('updates.form.submitting')}
              </span>
            ) : videoUrl ? (
              t('updates.form.change')
            ) : (
              t('updates.form.upload')
            )}
          </button>
        </div>

        {/* Video preview */}
        {videoUrl && !isUploadingVideo && (
          <div className="relative rounded-xl overflow-hidden border border-[#2e323b]/50 bg-black aspect-video">
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-contain"
            >
              {t('basics.videoNotSupported')}
            </video>
            <button
              type="button"
              onClick={() => {
                if (
                  videoUrl.startsWith('http') &&
                  !videoUrl.includes('youtube')
                ) {
                  mediaRequests.deleteFile(videoUrl).catch(console.error)
                }
                setVideoUrl('')
                if (videoInputRef.current) videoInputRef.current.value = ''
              }}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-black/70 hover:bg-[#ff716c]/80 text-white rounded-full transition-colors backdrop-blur-md"
              title={t('basics.removeVideo')}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* External link */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#a9abb3]">
          {t('updates.form.link_label')}
          <span className="text-[#73757d] ml-2 normal-case tracking-normal">
            {t('common.optional')}
          </span>
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://..."
          className="w-full bg-[#161a21] border border-[#2e323b]/60 rounded-xl px-4 py-2.5 text-[#ecedf6] text-sm placeholder:text-[#3a3e4a] focus:outline-none focus:border-[#8ff5ff]/50 transition-colors duration-200 font-mono"
        />
      </div>

      {/* Error */}
      {isError && (
        <p className="text-[#ff716c] text-xs flex items-center gap-1.5 font-['Space_Grotesk']">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          {getErrorMessage(error, t('updates.form.submit_failed'))}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={
            isPending ||
            !completed.trim() ||
            !videoUrl.trim() ||
            isUploadingImage ||
            isUploadingVideo
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8ff5ff]/15 border border-[#8ff5ff]/30 text-[#8ff5ff] text-[12px] font-bold uppercase tracking-widest hover:bg-[#8ff5ff]/25 hover:border-[#8ff5ff]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              {t('updates.form.submitting')}
            </>
          ) : (
            t('updates.form.submit_btn')
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[#73757d] text-[12px] font-medium hover:text-[#a9abb3] disabled:opacity-40 transition-colors duration-200"
        >
          <X className="w-3.5 h-3.5" />
          {t('btn.cancel')}
        </button>
      </div>
    </form>
  )
}
