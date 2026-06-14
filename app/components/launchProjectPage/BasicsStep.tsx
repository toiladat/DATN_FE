import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect } from 'react'
import { format } from 'date-fns'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ActionFooter } from './ActionFooter'
import { useLaunchProject } from '@/contexts/LaunchProjectContext'
import { ImageUpload } from '@/components/ui/image-upload'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { BasicsSchema } from '@/schemas/projectSchema'
import mediaRequests from '@/apis/requests/media'
import { useGetCategories } from '@/apis/queries/category'
import { useTranslation } from 'react-i18next'

interface BasicsStepProps {
  onStepChange?: (step: string) => void
}

export function BasicsStep({ onStepChange }: BasicsStepProps = {}) {
  const { t } = useTranslation()
  const { project, setBasics } = useLaunchProject()
  const { basics } = project
  const videoInputRef = useRef<HTMLInputElement>(null)

  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategories()

  useEffect(() => {
    if (categories.length > 0 && !basics.primaryCategory) {
      setBasics({ primaryCategory: categories[0].id })
    }
  }, [categories, basics.primaryCategory, setBasics])

  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
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
        const urls = await mediaRequests.uploadFiles(filesToUpload, 'cover')
        filesToUpload.forEach((f, idx) => {
          newCache[f.name + f.size] = urls[idx]
        })
      } catch (error) {
        toast.error(t('toast.upload_failed'), {
          description: t('toast.upload_failed_desc')
        })
        throw error
      } finally {
        setIsUploadingImage(false)
      }
    }

    setUploadedImageCache(newCache)
    const activeUrls = files
      .map((f) => newCache[f.name + f.size])
      .filter(Boolean)
    setBasics({ image: [...remainingInitialUrls, ...activeUrls] })
  }

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
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
          info: { type: 'project' },
          files: [
            { filename: file.name, filetype: file.type, filesize: file.size }
          ]
        })
        const uploadUrl = data[0].uploadUrl
        const finalUrl = data[0].fileUrl

        toast.info(t('toast.uploading_video'))
        await mediaRequests.uploadToPresignedUrl(file, uploadUrl)

        if (basics.video && basics.video.startsWith('http')) {
          mediaRequests.deleteFile(basics.video).catch(console.error)
        }
        setBasics({ video: finalUrl })
        toast.success(t('toast.video_uploaded_success'))
      } catch (error) {
        console.error(error)
        toast.error(t('toast.video_upload_failed'), {
          description: t('toast.video_upload_failed_desc')
        })
      } finally {
        setIsUploadingVideo(false)
        if (videoInputRef.current) {
          videoInputRef.current.value = ''
        }
      }
    }
  }

  const handleContinue = () => {
    const result = BasicsSchema.safeParse(basics)

    if (!result.success) {
      toast.error(t('validation.missing_required_fields'), {
        description: (
          <div className="flex flex-col gap-1 text-xs mt-1 text-neon-rose">
            {result.error.issues.map((err: any, idx: number) => (
              <div key={idx} className="flex items-start gap-1">
                <span className="shrink-0">•</span>
                <span>{t(err.message)}</span>
              </div>
            ))}
          </div>
        )
      })
      return
    }

    onStepChange?.('Milestones')
  }

  // Format dates for display
  const startDate = basics.startDate ? new Date(basics.startDate) : undefined
  const endDate = basics.endDate ? new Date(basics.endDate) : undefined

  // Tính số ngày campaign hiện tại từ startDate + endDate (để controlled input)
  const campaignDays =
    startDate && endDate
      ? Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      : undefined

  const handleDateSelect = (
    date: Date | undefined,
    field: 'startDate' | 'endDate'
  ) => {
    if (date) {
      // Ép thời gian về cuối ngày (23:59:59) để nếu user chọn "Hôm nay", thời gian vẫn là ở tương lai
      const adjustedDate = new Date(date)
      adjustedDate.setHours(23, 59, 59, 999)

      if (field === 'startDate') {
        // Khi đổi startDate: nếu đã có campaign duration thì tự recalculate endDate
        if (campaignDays && campaignDays > 0) {
          const newEndDate = new Date(adjustedDate)
          newEndDate.setDate(newEndDate.getDate() + campaignDays)
          setBasics({
            startDate: adjustedDate.toISOString(),
            endDate: newEndDate.toISOString()
          })
        } else {
          setBasics({ startDate: adjustedDate.toISOString() })
        }
      } else {
        setBasics({ [field]: adjustedDate.toISOString() })
      }
    } else {
      setBasics({ [field]: '' })
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-32">
      {/* Header Section */}
      <header className="mb-16">
        <h1 className="text-5xl font-bold font-['Space_Grotesk'] text-on-surface mb-4 tracking-tight">
          {t('basics.title')}
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          {t('basics.desc')}
        </p>
      </header>

      <div className="space-y-20">
        {/* Project Title Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              {t('basics.projectTitle')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('basics.projectTitleDesc')}
            </p>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="relative">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                {t('basics.fieldTitle')}
              </label>
              <Input
                className="w-full bg-background border border-border rounded-none px-4 py-6 focus-visible:ring-1 focus-visible:ring-neon-cyan transition-all text-foreground"
                maxLength={60}
                placeholder={t('basics.titlePlaceholder')}
                type="text"
                value={basics.title}
                onChange={(e) => setBasics({ title: e.target.value })}
              />
              <span className="absolute right-4 bottom-4 text-[10px] text-muted-foreground/50">
                {basics.title.length} / 60
              </span>
            </div>

            <div className="relative">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                {t('basics.fieldSubtitle')}
              </label>
              <Textarea
                className="w-full bg-background border border-border rounded-none px-4 py-4 focus-visible:ring-1 focus-visible:ring-neon-cyan transition-all text-foreground resize-none"
                maxLength={135}
                placeholder={t('basics.subtitlePlaceholder')}
                rows={3}
                value={basics.subtitle}
                onChange={(e) => setBasics({ subtitle: e.target.value })}
              />
              <span className="absolute right-4 bottom-4 text-[10px] text-muted-foreground/50">
                {basics.subtitle?.length || 0} / 135
              </span>
            </div>
          </div>
        </section>

        {/* Project Category Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              {t('basics.projectCategory')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('basics.projectCategoryDesc')}
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-muted-foreground">
                {t('basics.primaryCategory')}
              </label>
              <Select
                value={basics.primaryCategory}
                onValueChange={(val) => setBasics({ primaryCategory: val })}
              >
                <SelectTrigger className="w-full bg-background border border-border rounded-none px-4 py-6 focus:ring-1 focus:ring-neon-cyan">
                  <SelectValue placeholder={t('basics.selectCategory')} />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border rounded-none">
                  {isLoadingCategories ? (
                    <SelectItem value="loading" disabled>
                      {t('basics.loadingCategories')}
                    </SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      {t('basics.noCategories')}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-muted-foreground/60">
                {t('basics.secondaryCategory')}
              </label>
              <Select
                value={basics.secondaryCategory}
                onValueChange={(val) => setBasics({ secondaryCategory: val })}
              >
                <SelectTrigger className="w-full bg-background border border-border rounded-none px-4 py-6 focus:ring-1 focus:ring-neon-cyan">
                  <SelectValue placeholder={t('basics.selectCategory')} />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border rounded-none">
                  {isLoadingCategories ? (
                    <SelectItem value="loading" disabled>
                      {t('basics.loadingCategories')}
                    </SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      {t('basics.noCategories')}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Project Location Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              {t('basics.projectLocation')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('basics.projectLocationDesc')}
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="relative group/loc">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within/loc:text-neon-cyan transition-colors">
                location_on
              </span>
              <Input
                className="w-full bg-background border border-border rounded-none pl-12 pr-4 py-6 focus-visible:ring-1 focus-visible:ring-neon-cyan transition-all text-foreground"
                placeholder={t('basics.searchLocationPlaceholder')}
                type="text"
                value={basics.location}
                onChange={(e) => setBasics({ location: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Project Media Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              {t('basics.projectMedia')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('basics.projectMediaDesc')}
            </p>
          </div>
          <div className="lg:col-span-8 space-y-8">
            {/* Image Upload */}
            <div>
              <Label className="block text-sm font-medium text-muted-foreground mb-2">
                {t('basics.referenceImage')}
              </Label>
              <ImageUpload
                maxImages={4}
                initialPreviews={basics.image || []}
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
                  setBasics({
                    image: (basics.image || []).filter((img) => img !== url)
                  })
                }}
              />
              {isUploadingImage && (
                <p className="text-sm text-neon-cyan mt-2">
                  {t('basics.uploadingImages')}
                </p>
              )}
            </div>

            {/* Video Upload */}
            <div className="space-y-4">
              <div
                onClick={() => videoInputRef.current?.click()}
                className="relative group/video cursor-pointer rounded-none border border-border hover:bg-card/80 transition-all bg-background p-8 flex items-center gap-6"
              >
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  ref={videoInputRef}
                  onChange={handleVideoChange}
                />
                <div className="w-16 h-16 rounded-none bg-muted flex items-center justify-center text-neon-cyan group-hover/video:bg-neon-cyan group-hover/video:text-background transition-colors border border-border/40">
                  <span className="material-symbols-outlined text-3xl">
                    {basics.video ? 'smart_display' : 'videocam'}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{t('basics.projectVideo')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {isUploadingVideo
                      ? t('basics.uploadingVideo')
                      : basics.video
                        ? t('basics.videoSelected')
                        : t('basics.videoHelper')}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isUploadingVideo}
                  className="text-xs font-bold uppercase tracking-widest text-neon-cyan border border-neon-cyan/25 px-4 py-2 rounded-none group-hover/video:bg-neon-cyan/10 transition-all shadow-[1px_1px_0px_0px_var(--neon-purple)] hover:shadow-[2px_2px_0px_0px_var(--neon-purple)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploadingVideo
                    ? t('basics.videoUploading')
                    : basics.video
                      ? t('basics.videoChange')
                      : t('basics.videoUpload')}
                </button>
              </div>

              {basics.video && (
                <div className="relative rounded-none overflow-hidden border border-border bg-background aspect-video shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
                  <video
                    src={basics.video}
                    controls
                    className="w-full h-full object-contain bg-black"
                  >
                    {t('basics.videoNotSupported')}
                  </video>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (basics.video && basics.video.startsWith('http')) {
                        mediaRequests
                          .deleteFile(basics.video)
                          .catch(console.error)
                      }
                      setBasics({ video: undefined })
                      if (videoInputRef.current)
                        videoInputRef.current.value = ''
                    }}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-neon-rose/80 text-white rounded-none transition-colors backdrop-blur-md border border-border/40"
                    title={t('basics.removeVideo')}
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Project Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              {t('basics.projectStory')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('basics.projectStoryDesc')}
            </p>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-muted-foreground">
                {t('basics.projectDescription')}
              </label>
              <div className="rounded-none overflow-hidden border border-border">
                <RichTextEditor
                  height={450}
                  placeholder={t('basics.projectDescriptionPlaceholder')}
                  value={basics.description || ''}
                  onChange={(val) => setBasics({ description: val })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mt-2">
                <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-muted-foreground">
                  {t('basics.risks')}
                </label>
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-none uppercase font-bold tracking-widest border border-border/40">
                  {t('common.required')}
                </span>
              </div>
              <div className="rounded-none border border-border bg-background relative">
                <Textarea
                  className="w-full bg-transparent border-none focus-visible:ring-0 text-foreground px-4 py-4 min-h-[120px] resize-none shadow-none rounded-none"
                  placeholder={t('basics.risksPlaceholder')}
                  value={basics.risks || ''}
                  onChange={(e) => setBasics({ risks: e.target.value })}
                />
              </div>
            </div>
          </div>
        </section>
        {/* Funding Goal Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              {t('basics.fundingGoal')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('basics.fundingGoalDesc')}
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="relative max-w-sm">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-neon-cyan">
                €
              </span>
              <Input
                className="w-full bg-background border border-border rounded-none pl-10 pr-4 py-6 focus-visible:ring-1 focus-visible:ring-neon-cyan transition-all text-2xl font-bold text-foreground"
                placeholder="50,000"
                type="number"
                value={basics.fundingGoal || ''}
                onChange={(e) =>
                  setBasics({ fundingGoal: Number(e.target.value) })
                }
              />
            </div>
            <div className="mt-6 p-4 rounded-none bg-neon-rose/5 border border-neon-rose/20 flex gap-4">
              <span className="material-symbols-outlined text-neon-rose">
                warning
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-neon-rose">
                  {t('basics.allOrNothing')}:
                </strong>{' '}
                {t('basics.allOrNothingDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Target Launch Date Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              {t('basics.targetLaunchDate')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('basics.targetLaunchDateDesc')}
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="mb-6">
              <label className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold block mb-2">
                {t('basics.selectDate')}
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full md:w-[280px] justify-start text-left font-normal bg-background border border-border rounded-none px-4 py-6 focus:ring-1 focus:ring-neon-cyan hover:bg-card text-foreground border-solid shadow-none',
                        !startDate && 'text-muted-foreground'
                      )}
                    >
                      <span className="material-symbols-outlined text-neon-cyan mr-2 text-xl">
                        calendar_month
                      </span>
                      {startDate ? (
                        format(startDate, 'PPP')
                      ) : (
                        <span>{t('basics.pickDate')}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-card border border-border text-foreground rounded-none"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => handleDateSelect(date, 'startDate')}
                      initialFocus
                      className="bg-card rounded-none text-foreground"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="p-5 bg-card/40 backdrop-blur-xl border border-border rounded-none flex items-center gap-6">
              <div className="w-12 h-12 rounded-none border border-neon-cyan/20 bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
                <span className="material-symbols-outlined">timeline</span>
              </div>
              <div>
                <h5 className="font-bold text-sm">
                  {t('basics.recommendedTimeline')}
                </h5>
                <p className="text-xs text-muted-foreground">
                  {t('basics.recommendedTimelineDesc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Duration Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              {t('basics.campaignDuration')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('basics.campaignDurationDesc')}
            </p>
          </div>
          <div className="lg:col-span-8">
            <RadioGroup
              defaultValue="fixed"
              className="flex flex-col md:flex-row gap-4 w-full"
            >
              {/* Radio 1 */}
              <div className="flex-1 w-full relative">
                <RadioGroupItem
                  value="fixed"
                  id="fixed"
                  className="peer sr-only"
                />
                <label
                  htmlFor="fixed"
                  className="absolute inset-0 cursor-pointer rounded-none z-0"
                ></label>
                <div className="block h-full p-6 bg-background border border-border rounded-none peer-data-[state=checked]:border-neon-cyan peer-data-[state=checked]:bg-neon-cyan/5 peer-data-[state=checked]:shadow-[2px_2px_0px_var(--neon-cyan)] transition-all relative z-10 pointer-events-none">
                  <div className="flex justify-between items-start mb-4">
                    <span className="material-symbols-outlined text-muted-foreground peer-data-[state=checked]:text-neon-cyan">
                      schedule
                    </span>
                    {/* Fake radio indicator inside the box for stylistic purpose */}
                    <div className="w-5 h-5 rounded-none border-2 border-border peer-data-[state=checked]:border-neon-cyan peer-data-[state=checked]:bg-neon-cyan flex items-center justify-center">
                      <div className="w-2 h-2 rounded-none bg-zinc-950 dark:bg-white peer-data-[state=unchecked]:hidden"></div>
                    </div>
                  </div>
                  <h4 className="font-bold mb-1 pointer-events-auto">
                    {t('basics.fixedDays')}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4 pointer-events-auto">
                    {t('basics.fixedDaysDesc')}
                  </p>
                  <Input
                    className="w-full bg-muted/50 border border-border rounded-none px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-neon-cyan h-10 pointer-events-auto"
                    placeholder="30"
                    type="number"
                    value={campaignDays || ''}
                    onChange={(e) => {
                      const days = Number(e.target.value)
                      if (days > 0 && startDate) {
                        const newEndDate = new Date(startDate)
                        newEndDate.setDate(newEndDate.getDate() + days)
                        setBasics({ endDate: newEndDate.toISOString() })
                      } else if (days === 0 || !e.target.value) {
                        setBasics({ endDate: '' })
                      }
                    }}
                  />
                </div>
              </div>

              {/* Radio 2 */}
              <div className="flex-1 w-full relative">
                <RadioGroupItem
                  value="specific"
                  id="specific"
                  className="peer sr-only"
                />
                <label
                  htmlFor="specific"
                  className="absolute inset-0 cursor-pointer rounded-none z-0"
                ></label>
                <div className="block h-full p-6 bg-background border border-border rounded-none peer-data-[state=checked]:border-neon-cyan peer-data-[state=checked]:bg-neon-cyan/5 peer-data-[state=checked]:shadow-[2px_2px_0px_var(--neon-cyan)] transition-all relative z-10 pointer-events-none">
                  <div className="flex justify-between items-start mb-4">
                    <span className="material-symbols-outlined text-muted-foreground peer-data-[state=checked]:text-neon-cyan">
                      event
                    </span>
                    <div className="w-5 h-5 rounded-none border-2 border-border peer-data-[state=checked]:border-neon-cyan peer-data-[state=checked]:bg-neon-cyan flex items-center justify-center">
                      <div className="w-2 h-2 rounded-none bg-zinc-950 dark:bg-white peer-data-[state=unchecked]:hidden"></div>
                    </div>
                  </div>
                  <h4 className="font-bold mb-1 pointer-events-auto">
                    {t('basics.endSpecificDate')}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4 pointer-events-auto">
                    {t('basics.endSpecificDateDesc')}
                  </p>

                  <div className="mt-2 pointer-events-auto">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal bg-muted/50 border border-border rounded-none px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-neon-cyan h-10 hover:bg-card text-foreground border-solid shadow-none',
                            !endDate && 'text-muted-foreground'
                          )}
                        >
                          <span className="material-symbols-outlined text-sm mr-2">
                            event
                          </span>
                          {endDate ? (
                            format(endDate, 'PPP')
                          ) : (
                            <span>{t('basics.selectEndDate')}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-card border border-border text-foreground rounded-none"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => handleDateSelect(date, 'endDate')}
                          initialFocus
                          className="bg-card rounded-none text-foreground"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        </section>
      </div>

      <ActionFooter
        onContinue={handleContinue}
        continueText={t('basics.continueToMilestones')}
      />
    </div>
  )
}
