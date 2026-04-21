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

interface BasicsStepProps {
  onStepChange?: (step: string) => void
}

export function BasicsStep({ onStepChange }: BasicsStepProps = {}) {
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
        toast.error('Upload Failed', {
          description: 'Failed to upload some images.'
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
        toast.error('Video too large', { description: 'Max size is 100MB.' })
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

        toast.info('Uploading video...')
        await mediaRequests.uploadToPresignedUrl(file, uploadUrl)

        if (basics.video && basics.video.startsWith('http')) {
          mediaRequests.deleteFile(basics.video).catch(console.error)
        }
        setBasics({ video: finalUrl })
        toast.success('Video uploaded successfully!')
      } catch (error) {
        console.error(error)
        toast.error('Video upload failed', {
          description: 'Please try again with a different format.'
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
      // Collect the first error message from Zod
      const errorMessages = result.error.issues
        .map((err: any) => err.message)
        .join(', ')
      toast.error('Missing Required Fields', {
        description: errorMessages
      })
      return
    }

    onStepChange?.('Milestones')
  }

  // Format dates for display
  const startDate = basics.startDate ? new Date(basics.startDate) : undefined
  const endDate = basics.endDate ? new Date(basics.endDate) : undefined

  const handleDateSelect = (
    date: Date | undefined,
    field: 'startDate' | 'endDate'
  ) => {
    if (date) {
      setBasics({ [field]: date.toISOString() })
    } else {
      setBasics({ [field]: '' })
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-32">
      {/* Header Section */}
      <header className="mb-16">
        <h1 className="text-5xl font-bold font-['Space_Grotesk'] text-on-surface mb-4 tracking-tight">
          Start with the basics
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Make it easy for people to learn about your project. This information
          will appear on your project page and in search results.
        </p>
      </header>

      <div className="space-y-20">
        {/* Project Title Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              Project title
            </h3>
            <p className="text-[#a9abb3] text-sm">
              Create a clear, concise title and subtitle that explains what
              you're creating.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="relative">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-[#8ff5ff] mb-2">
                Title
              </label>
              <Input
                className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl px-4 py-6 focus-visible:ring-1 focus-visible:ring-[#8ff5ff] transition-all text-[#ecedf6]"
                maxLength={60}
                placeholder="The Eternal Vault: A Cinematic Web3 Experience"
                type="text"
                value={basics.title}
                onChange={(e) => setBasics({ title: e.target.value })}
              />
              <span className="absolute right-4 bottom-4 text-[10px] text-[#a9abb3]/50">
                {basics.title.length} / 60
              </span>
            </div>

            <div className="relative">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-[#8ff5ff] mb-2">
                Subtitle
              </label>
              <Textarea
                className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl px-4 py-4 focus-visible:ring-1 focus-visible:ring-[#8ff5ff] transition-all text-[#ecedf6] resize-none"
                maxLength={135}
                placeholder="An immersive journey through the Radiant Void, leveraging multi-dimensional UI and smart contract security."
                rows={3}
                value={basics.subtitle}
                onChange={(e) => setBasics({ subtitle: e.target.value })}
              />
              <span className="absolute right-4 bottom-4 text-[10px] text-[#a9abb3]/50">
                {basics.subtitle?.length || 0} / 135
              </span>
            </div>
          </div>
        </section>

        {/* Project Category Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              Project category
            </h3>
            <p className="text-[#a9abb3] text-sm">
              Select categories that best describe your project to help backers
              find you.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-[#8ff5ff]">
                Primary Category
              </label>
              <Select
                value={basics.primaryCategory}
                onValueChange={(val) => setBasics({ primaryCategory: val })}
              >
                <SelectTrigger className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl px-4 py-6 focus:ring-1 focus:ring-[#8ff5ff]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#161a21] border-[#45484f]/20">
                  {isLoadingCategories ? (
                    <SelectItem value="loading" disabled>
                      Loading categories...
                    </SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      No categories found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-[#a9abb3]/60">
                Secondary Category (Optional)
              </label>
              <Select
                value={basics.secondaryCategory}
                onValueChange={(val) => setBasics({ secondaryCategory: val })}
              >
                <SelectTrigger className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl px-4 py-6 focus:ring-1 focus:ring-[#8ff5ff]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#161a21] border-[#45484f]/20">
                  {isLoadingCategories ? (
                    <SelectItem value="loading" disabled>
                      Loading categories...
                    </SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      No categories found
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
              Project location
            </h3>
            <p className="text-[#a9abb3] text-sm">
              Where are you based? This helps us localized your project for
              potential backers.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="relative group/loc">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#a9abb3]/60 group-focus-within/loc:text-[#8ff5ff] transition-colors">
                location_on
              </span>
              <Input
                className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl pl-12 pr-4 py-6 focus-visible:ring-1 focus-visible:ring-[#8ff5ff] transition-all text-[#ecedf6]"
                placeholder="Search for city or country"
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
              Project media
            </h3>
            <p className="text-[#a9abb3] text-sm">
              Visuals are the most important part of your project presentation.
              High-quality imagery increases conversion by 80%.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-8">
            {/* Image Upload */}
            <div>
              <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                Reference Image (Required)
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
                <p className="text-sm text-[#8ff5ff] mt-2">
                  Uploading images...
                </p>
              )}
            </div>

            {/* Video Upload */}
            <div className="space-y-4">
              <div
                onClick={() => videoInputRef.current?.click()}
                className="relative group/video cursor-pointer rounded-xl border border-[#45484f]/30 hover:bg-[#1c2028] transition-all bg-[#10131a] p-8 flex items-center gap-6"
              >
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  ref={videoInputRef}
                  onChange={handleVideoChange}
                />
                <div className="w-16 h-16 rounded-full bg-[#22262f] flex items-center justify-center text-[#8ff5ff] group-hover/video:bg-[#8ff5ff] group-hover/video:text-[#005d63] transition-colors">
                  <span className="material-symbols-outlined text-3xl">
                    {basics.video ? 'smart_display' : 'videocam'}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">Project Video (Optional)</h4>
                  <p className="text-sm text-[#a9abb3]">
                    {isUploadingVideo
                      ? 'Uploading video, please wait...'
                      : basics.video
                        ? 'Video selected. Click to change.'
                        : 'Up to 100MB. MP4, WEBM, or MOV format. High definition recommended.'}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isUploadingVideo}
                  className="text-xs font-bold uppercase tracking-widest text-[#8ff5ff] border border-[#8ff5ff]/20 px-4 py-2 rounded-lg group-hover/video:bg-[#8ff5ff]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploadingVideo
                    ? 'Uploading...'
                    : basics.video
                      ? 'Change'
                      : 'Upload'}
                </button>
              </div>

              {basics.video && (
                <div className="relative rounded-xl overflow-hidden border border-[#45484f]/30 bg-[#10131a] aspect-video shadow-lg">
                  <video
                    src={basics.video}
                    controls
                    className="w-full h-full object-contain bg-black"
                  >
                    Your browser does not support the video tag.
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
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-[#ff716c]/80 text-white rounded-full transition-colors backdrop-blur-md"
                    title="Remove Video"
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
              Project story
            </h3>
            <p className="text-[#a9abb3] text-sm">
              Tell the world about what you're building. Be transparent about
              risks and challenges.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-[#8ff5ff]">
                Project Description
              </label>
              <div className="rounded-2xl overflow-hidden border border-[#45484f]/30">
                <RichTextEditor
                  height={450}
                  placeholder="Start typing your project's story here..."
                  value={basics.description || ''}
                  onChange={(val) => setBasics({ description: val })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mt-2">
                <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-[#8ff5ff]">
                  Risks & Challenges
                </label>
                <span className="text-[10px] text-[#a9abb3] bg-[#22262f] px-2 py-1 rounded-full uppercase font-bold tracking-widest">
                  Required
                </span>
              </div>
              <div className="rounded-2xl border border-[#45484f]/30 bg-[#10131a] relative">
                <Textarea
                  className="w-full bg-transparent border-none focus-visible:ring-0 text-[#ecedf6] px-4 py-4 min-h-[120px] resize-none shadow-none"
                  placeholder="Be transparent about potential technical hurdles, market risks, or regulatory challenges..."
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
              Funding goal
            </h3>
            <p className="text-[#a9abb3] text-sm">
              Set a goal that's both ambitious and realistic. Remember our
              'all-or-nothing' policy.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="relative max-w-sm">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[#8ff5ff]">
                €
              </span>
              <Input
                className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl pl-10 pr-4 py-6 focus-visible:ring-1 focus-visible:ring-[#8ff5ff] transition-all text-2xl font-bold text-[#ecedf6]"
                placeholder="50,000"
                type="number"
                value={basics.fundingGoal || ''}
                onChange={(e) =>
                  setBasics({ fundingGoal: Number(e.target.value) })
                }
              />
            </div>
            <div className="mt-6 p-4 rounded-xl bg-[#9f0519]/10 border border-[#d7383b]/20 flex gap-4">
              <span className="material-symbols-outlined text-[#d7383b]">
                warning
              </span>
              <p className="text-sm text-[#a9abb3] leading-relaxed">
                <strong className="text-[#d7383b]">All-or-nothing:</strong> If
                you don't reach your funding goal by the deadline, all
                contributions will be automatically refunded and you will
                receive no funds.
              </p>
            </div>
          </div>
        </section>

        {/* Target Launch Date Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              Target launch date
            </h3>
            <p className="text-[#a9abb3] text-sm">
              Optional. Set a target date to stay on track. This can be changed
              later.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="mb-6">
              <label className="text-[10px] uppercase tracking-tighter text-[#a9abb3] font-bold block mb-2">
                Select Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full md:w-[280px] justify-start text-left font-normal bg-[#10131a] border-[#45484f]/30 rounded-xl px-4 py-6 focus:ring-1 focus:ring-[#8ff5ff] hover:bg-[#161a21] text-[#ecedf6] border-solid shadow-none',
                      !startDate && 'text-[#45484f]'
                    )}
                  >
                    <span className="material-symbols-outlined text-[#8ff5ff] mr-2 text-xl">
                      calendar_month
                    </span>
                    {startDate ? (
                      format(startDate, 'PPP')
                    ) : (
                      <span>Pick a target launch date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-[#161a21] border-[#45484f]/20 text-[#ecedf6]"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => handleDateSelect(date, 'startDate')}
                    initialFocus
                    className="bg-[#161a21] rounded-xl text-[#ecedf6]"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="p-5 bg-[#22262f]/40 backdrop-blur-xl border border-[#8ff5ff]/5 rounded-2xl flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-[#8ff5ff]/10 flex items-center justify-center text-[#8ff5ff]">
                <span className="material-symbols-outlined">timeline</span>
              </div>
              <div>
                <h5 className="font-bold text-sm">Recommended Timeline</h5>
                <p className="text-xs text-[#a9abb3]">
                  We recommend a 3-week pre-launch phase to build hype before
                  your live campaign.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Duration Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold mb-2">
              Campaign duration
            </h3>
            <p className="text-[#a9abb3] text-sm">
              Most successful campaigns last between 30 and 45 days.
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
                  className="absolute inset-0 cursor-pointer rounded-2xl z-0"
                ></label>
                <div className="block h-full p-6 bg-[#10131a] border border-[#45484f]/30 rounded-2xl peer-data-[state=checked]:border-[#8ff5ff] peer-data-[state=checked]:bg-[#8ff5ff]/5 transition-all relative z-10 pointer-events-none">
                  <div className="flex justify-between items-start mb-4">
                    <span className="material-symbols-outlined text-[#a9abb3] peer-data-[state=checked]:text-[#8ff5ff]">
                      schedule
                    </span>
                    {/* Fake radio indicator inside the box for stylistic purpose */}
                    <div className="w-5 h-5 rounded-full border-2 border-[#45484f] peer-data-[state=checked]:border-[#8ff5ff] peer-data-[state=checked]:bg-[#8ff5ff] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#005d63] peer-data-[state=unchecked]:hidden"></div>
                    </div>
                  </div>
                  <h4 className="font-bold mb-1 pointer-events-auto">
                    Fixed number of days
                  </h4>
                  <p className="text-xs text-[#a9abb3] mb-4 pointer-events-auto">
                    Set a specific length (1-60 days)
                  </p>
                  <Input
                    className="w-full bg-[#161a21]/50 border border-[#45484f]/20 rounded-lg px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-[#8ff5ff] h-10 pointer-events-auto"
                    placeholder="30"
                    type="number"
                    onChange={(e) => {
                      const days = Number(e.target.value)
                      if (days > 0 && startDate) {
                        const newEndDate = new Date(startDate)
                        newEndDate.setDate(newEndDate.getDate() + days)
                        setBasics({ endDate: newEndDate.toISOString() })
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
                  className="absolute inset-0 cursor-pointer rounded-2xl z-0"
                ></label>
                <div className="block h-full p-6 bg-[#10131a] border border-[#45484f]/30 rounded-2xl peer-data-[state=checked]:border-[#8ff5ff] peer-data-[state=checked]:bg-[#8ff5ff]/5 transition-all relative z-10 pointer-events-none">
                  <div className="flex justify-between items-start mb-4">
                    <span className="material-symbols-outlined text-[#a9abb3] peer-data-[state=checked]:text-[#8ff5ff]">
                      event
                    </span>
                    <div className="w-5 h-5 rounded-full border-2 border-[#45484f] peer-data-[state=checked]:border-[#8ff5ff] peer-data-[state=checked]:bg-[#8ff5ff] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#005d63] peer-data-[state=unchecked]:hidden"></div>
                    </div>
                  </div>
                  <h4 className="font-bold mb-1 pointer-events-auto">
                    End on a specific date
                  </h4>
                  <p className="text-xs text-[#a9abb3] mb-4 pointer-events-auto">
                    Choose a specific calendar day
                  </p>

                  <div className="mt-2 pointer-events-auto">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal bg-[#161a21]/50 border-[#45484f]/20 rounded-lg px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-[#8ff5ff] h-10 hover:bg-[#22262f] text-[#ecedf6] border-solid shadow-none',
                            !endDate && 'text-[#45484f]'
                          )}
                        >
                          <span className="material-symbols-outlined text-sm mr-2">
                            event
                          </span>
                          {endDate ? (
                            format(endDate, 'PPP')
                          ) : (
                            <span>Select end date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-[#161a21] border-[#45484f]/20 text-[#ecedf6]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => handleDateSelect(date, 'endDate')}
                          initialFocus
                          className="bg-[#161a21] rounded-xl text-[#ecedf6]"
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
        continueText="Continue to Milestones"
      />
    </div>
  )
}
