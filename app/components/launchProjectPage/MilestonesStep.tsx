import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ActionFooter } from './ActionFooter'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ImageUpload } from '@/components/ui/image-upload'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

import {
  useLaunchProject,
  defaultMilestone
} from '@/contexts/LaunchProjectContext'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { MilestoneSchema } from '@/schemas/projectSchema'
import mediaRequests from '@/apis/requests/media'
import { useTranslation } from 'react-i18next'

interface MilestonesStepProps {
  onStepChange?: (step: string) => void
}

export function MilestonesStep({ onStepChange }: MilestonesStepProps = {}) {
  const { t, i18n } = useTranslation()
  const {
    project,
    addMilestone,
    updateMilestone,
    removeMilestone,
    setMilestoneDraft,
    setMilestoneCache
  } = useLaunchProject()
  const {
    milestones,
    milestoneDraft: newMilestone,
    milestoneCache: uploadedCache
  } = project

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [resetKey, setResetKey] = useState(0)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const [isUploading, setIsUploading] = useState(false)

  const totalBudget = milestones.reduce((sum, m) => sum + (m.budget || 0), 0)
  const totalDuration = milestones.reduce(
    (sum, m) => sum + (m.durationDays || 0),
    0
  )

  const remainingBudget = (project.basics.fundingGoal || 0) - totalBudget
  const maxDuration =
    project.basics.startDate && project.basics.endDate
      ? Math.max(
          0,
          Math.round(
            (new Date(project.basics.endDate).getTime() -
              new Date(project.basics.startDate).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0
  const remainingDuration = maxDuration > 0 ? maxDuration - totalDuration : 0
  const handleDurationChange = (val: number) => {
    // Milestone 1 starts exactly on the Target Launch Date
    let baseStartDate = project.basics.startDate
      ? new Date(project.basics.startDate)
      : new Date()

    if (editingIndex !== null) {
      if (editingIndex > 0 && milestones[editingIndex - 1]?.endDate) {
        baseStartDate = new Date(milestones[editingIndex - 1].endDate)
        baseStartDate.setDate(baseStartDate.getDate() + 1)
      }
    } else {
      if (milestones.length > 0 && milestones[milestones.length - 1]?.endDate) {
        baseStartDate = new Date(milestones[milestones.length - 1].endDate)
        baseStartDate.setDate(baseStartDate.getDate() + 1)
      }
    }

    const calculatedStartDate = baseStartDate.toISOString()

    const endDateObj = new Date(baseStartDate)
    endDateObj.setDate(endDateObj.getDate() + (val > 0 ? val - 1 : 0))
    const calculatedEndDate = endDateObj.toISOString()

    setMilestoneDraft({
      ...newMilestone,
      durationDays: val,
      startDate: calculatedStartDate,
      endDate: calculatedEndDate
    })
  }

  const handleAddMilestone = async () => {
    const result = MilestoneSchema.safeParse(newMilestone)

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

    const finalImages = newMilestone.images

    const originalBudget =
      editingIndex !== null ? milestones[editingIndex].budget : 0
    const originalDuration =
      editingIndex !== null ? milestones[editingIndex].durationDays : 0

    if (newMilestone.budget - originalBudget > remainingBudget) {
      toast.error(t('validation.budget_exceeded'), {
        description: t('toast.milestone_budget_exceeded_desc', {
          remaining: remainingBudget.toLocaleString()
        })
      })
      return
    }

    if (editingIndex !== null) {
      updateMilestone(editingIndex, {
        ...newMilestone,
        expectedOutcome: newMilestone.expectedOutcome || '',
        images: finalImages
      })
      setEditingIndex(null)
      toast.success(t('toast.milestone_updated'))
    } else {
      addMilestone({
        ...newMilestone,
        expectedOutcome: newMilestone.expectedOutcome || '',
        images: finalImages
      })
      const newTotalPages = Math.ceil((milestones.length + 1) / itemsPerPage)
      setCurrentPage(newTotalPages)
      toast.success(t('toast.milestone_added'))
    }
    setMilestoneDraft(defaultMilestone)
    setMilestoneCache({})
    setResetKey((prev) => prev + 1)
    setIsUploading(false)
  }

  const handleImageChange = async (
    files: File[],
    remainingInitialUrls: string[] = []
  ) => {
    const currentKeys = files.map((f) => f.name + f.size)
    const newCache = { ...uploadedCache }

    // Xóa ảnh đã bị remove ở UI khỏi server luôn
    Object.keys(newCache).forEach((key) => {
      if (!currentKeys.includes(key)) {
        mediaRequests.deleteFile(newCache[key]).catch(console.error)
        delete newCache[key]
      }
    })

    const filesToUpload = files.filter((f) => !newCache[f.name + f.size])
    if (filesToUpload.length > 0) {
      setIsUploading(true)
      try {
        const urls = await mediaRequests.uploadFiles(filesToUpload, 'milestone')
        filesToUpload.forEach((f, idx) => {
          newCache[f.name + f.size] = urls[idx]
        })
      } catch (error) {
        toast.error(t('toast.upload_failed'), {
          description: t('toast.upload_failed_desc')
        })
      } finally {
        setIsUploading(false)
      }
    }

    setMilestoneCache(newCache)
    const activeUrls = files
      .map((f) => newCache[f.name + f.size])
      .filter(Boolean)
    setMilestoneDraft({
      ...newMilestone,
      images: [...remainingInitialUrls, ...activeUrls]
    })
  }

  return (
    <div className="max-w-6xl mx-auto pb-32">
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] tracking-tighter text-foreground mb-3">
          {t('milestones.title')}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {t('milestones.desc')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Summary */}
        <div className="md:col-span-12 lg:col-span-8 space-y-8">
          {/* Budget/Time Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-card backdrop-blur-xl border border-border rounded-none relative overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground text-sm">
                    {t('milestones.totalBudget')}
                  </span>
                  <span className="text-neon-cyan font-bold font-['Space_Grotesk'] text-lg">
                    €{totalBudget.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-background rounded-none overflow-hidden border border-border/20">
                  <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_10px_var(--color-neon-cyan)/40] transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (totalBudget / (project.basics.fundingGoal || 1)) * 100)}%`
                    }}
                  ></div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground italic">
                  {t('milestones.remainingBudget', {
                    remaining: remainingBudget.toLocaleString()
                  })}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card backdrop-blur-xl border border-border rounded-none relative overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground text-sm">
                    {t('milestones.executionTime')}
                  </span>
                  <span className="text-neon-cyan font-bold font-['Space_Grotesk'] text-lg">
                    {t('milestones.totalDuration', { duration: totalDuration })}
                  </span>
                </div>
                <div className="h-2 bg-background rounded-none overflow-hidden border border-border/20">
                  <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_10px_var(--color-neon-cyan)/40] transition-all duration-500"
                    style={{
                      width:
                        maxDuration > 0
                          ? `${Math.min(100, (totalDuration / maxDuration) * 100)}%`
                          : '100%'
                    }}
                  ></div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground italic">
                  {maxDuration > 0
                    ? t('milestones.remainingDuration', {
                        remaining: remainingDuration
                      })
                    : t('milestones.noMaxDuration', {
                        count: milestones.length
                      })}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Milestone Form */}
          <Card className="bg-card rounded-none border border-border/50 shadow-none">
            <CardContent className="p-8 space-y-6">
              <div>
                <Label className="block text-sm font-medium text-muted-foreground mb-2">
                  {t('milestones.name')}
                </Label>
                <Input
                  className="w-full bg-background border border-border text-foreground rounded-none focus-visible:ring-1 focus-visible:ring-neon-cyan py-6 px-4"
                  placeholder={t('milestones.namePlaceholder')}
                  type="text"
                  value={newMilestone.name}
                  onChange={(e) =>
                    setMilestoneDraft({ ...newMilestone, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-muted-foreground mb-2">
                  {t('milestones.description')}
                </Label>
                <Textarea
                  className="w-full bg-background border border-border text-foreground rounded-none focus-visible:ring-1 focus-visible:ring-neon-cyan p-4 resize-none shadow-none"
                  placeholder={t('milestones.descriptionPlaceholder')}
                  rows={4}
                  value={newMilestone.description}
                  onChange={(e) =>
                    setMilestoneDraft({
                      ...newMilestone,
                      description: e.target.value
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t('milestones.duration')}
                  </Label>
                  <Input
                    className="w-full bg-background border border-border text-foreground rounded-none focus-visible:ring-1 focus-visible:ring-neon-cyan py-6 px-4 shadow-none"
                    type="number"
                    value={newMilestone.durationDays || ''}
                    onChange={(e) =>
                      handleDurationChange(Number(e.target.value))
                    }
                  />
                  <p className="mt-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                    {t('milestones.durationHelper')}
                  </p>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-muted-foreground mb-1">
                    {t('milestones.budget')}
                  </Label>
                  <Input
                    className="w-full bg-background border border-border text-foreground rounded-none focus-visible:ring-1 focus-visible:ring-neon-cyan py-6 px-4 shadow-none"
                    type="number"
                    value={newMilestone.budget || ''}
                    onChange={(e) =>
                      setMilestoneDraft({
                        ...newMilestone,
                        budget: Number(e.target.value)
                      })
                    }
                  />
                  <p className="mt-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                    {t('milestones.budgetHelper')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-muted-foreground mb-2">
                    {t('milestones.advantages')}
                  </Label>
                  <Input
                    className="w-full bg-background border border-border text-foreground rounded-none focus-visible:ring-1 focus-visible:ring-neon-cyan py-6 px-4 shadow-none"
                    type="text"
                    value={newMilestone.advantages}
                    onChange={(e) =>
                      setMilestoneDraft({
                        ...newMilestone,
                        advantages: e.target.value
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-muted-foreground mb-2">
                    {t('milestones.challenges')}
                  </Label>
                  <Input
                    className="w-full bg-background border border-border text-foreground rounded-none focus-visible:ring-1 focus-visible:ring-neon-cyan py-6 px-4 shadow-none"
                    type="text"
                    value={newMilestone.challenges}
                    onChange={(e) =>
                      setMilestoneDraft({
                        ...newMilestone,
                        challenges: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-muted-foreground mb-2">
                    {t('milestones.referenceImage')}
                  </Label>
                  <ImageUpload
                    key={resetKey}
                    maxImages={4}
                    initialPreviews={newMilestone.images}
                    onImagesChange={handleImageChange}
                    onRemoveInitial={(url) => {
                      const newCache = { ...uploadedCache }
                      const keyToDelete = Object.keys(newCache).find(
                        (k) => newCache[k] === url
                      )
                      if (keyToDelete) {
                        delete newCache[keyToDelete]
                        setMilestoneCache(newCache)
                      }
                      mediaRequests.deleteFile(url).catch(console.error)

                      setMilestoneDraft({
                        ...newMilestone,
                        images: newMilestone.images?.filter(
                          (img) => img !== url
                        )
                      })
                    }}
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-muted-foreground mb-2">
                    {t('milestones.expectedOutcome')}
                  </Label>
                  <div className="mb-6 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] rounded-none relative z-10">
                    <RichTextEditor
                      placeholder={t('milestones.expectedOutcomePlaceholder')}
                      value={newMilestone.expectedOutcome}
                      onChange={(val) =>
                        setMilestoneDraft({
                          ...newMilestone,
                          expectedOutcome: val
                        })
                      }
                    />
                  </div>
                  <div className="border border-neon-purple/20 bg-neon-purple/5 p-4 flex gap-4 items-start rounded-none">
                    <span className="material-symbols-outlined text-neon-purple mt-1">
                      gavel
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {t('milestones.adminWarning')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 gap-3">
                {editingIndex !== null && (
                  <Button
                    variant="ghost"
                    className="px-6 py-6 text-muted-foreground font-bold rounded-none hover:text-foreground hover:bg-background transition-all border-none"
                    onClick={() => {
                      setEditingIndex(null)
                      setMilestoneDraft(defaultMilestone)
                      setResetKey((prev) => prev + 1)
                    }}
                  >
                    {t('milestones.cancelEdit')}
                  </Button>
                )}
                <Button
                  type="button"
                  className="px-8 py-6 bg-neon-cyan text-background font-bold rounded-none hover:bg-neon-cyan/80 transition-all border border-neon-cyan shadow-[2px_2px_0px_0px_var(--neon-purple)]"
                  onClick={handleAddMilestone}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin material-symbols-outlined text-sm">
                        progress_activity
                      </span>
                      {t('milestones.uploading')}
                    </span>
                  ) : editingIndex !== null ? (
                    t('milestones.update')
                  ) : (
                    t('milestones.add')
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Column: Step-by-Step Summary */}
        <div className="md:col-span-12 lg:col-span-4 sticky top-24">
          <h3 className="text-xl font-['Space_Grotesk'] font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-neon-cyan">
              analytics
            </span>
            {t('milestones.pipeline')}
          </h3>

          <div className="space-y-2.5 relative">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-4 bottom-10 w-[2px] bg-gradient-to-b from-neon-cyan to-border/20 z-0"></div>

            {(() => {
              let currentDate = project.basics.startDate
                ? new Date(project.basics.startDate)
                : new Date()

              const computed = milestones.map((milestone, index) => {
                // Calculate dates
                const startDate = new Date(currentDate)
                const endDate = new Date(currentDate)
                endDate.setDate(
                  endDate.getDate() +
                    (milestone.durationDays > 0
                      ? milestone.durationDays - 1
                      : 0)
                )

                // Next milestone starts 1 day after this one ends
                currentDate = new Date(endDate)
                currentDate.setDate(currentDate.getDate() + 1)

                return { ...milestone, index, startDate, endDate }
              })

              const totalPages = Math.ceil(computed.length / itemsPerPage)
              const startIndex = (currentPage - 1) * itemsPerPage
              const currentPageMilestones = computed.slice(
                startIndex,
                startIndex + itemsPerPage
              )

              const formatRange = (start: Date, end: Date) => {
                const locale = i18n.language === 'vi' ? 'vi-VN' : 'en-US'
                const startStr = start.toLocaleDateString(locale, {
                  month: 'short',
                  day: 'numeric'
                })
                const endStr = end.toLocaleDateString(locale, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
                return `${startStr} - ${endStr}`
              }

              return (
                <>
                  {currentPageMilestones.map((milestone) => (
                    <div key={milestone.index} className="relative z-10 pl-14">
                      <div className="absolute left-0 top-1 w-14 h-14 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-none bg-neon-cyan border border-background flex items-center justify-center">
                          <span className="text-background text-[10px] font-black">
                            {String(milestone.index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                      <Card className="bg-card rounded-none border border-border/50 hover:border-neon-cyan/30 transition-colors shadow-none group/card">
                        <CardContent className="p-l-5 relative">
                          <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => {
                                setMilestoneDraft({
                                  name: milestone.name,
                                  description: milestone.description,
                                  durationDays: milestone.durationDays,
                                  budget: milestone.budget,
                                  expectedOutcome: milestone.expectedOutcome,
                                  advantages: milestone.advantages || '',
                                  challenges: milestone.challenges || '',
                                  images: milestone.images || [],
                                  startDate:
                                    milestone.startDate instanceof Date
                                      ? milestone.startDate.toISOString()
                                      : milestone.startDate || '',
                                  endDate:
                                    milestone.endDate instanceof Date
                                      ? milestone.endDate.toISOString()
                                      : milestone.endDate || ''
                                })
                                setEditingIndex(milestone.index)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                              }}
                              className="p-1 text-neon-cyan hover:text-foreground transition-colors"
                              title={t('btn.edit')}
                            >
                              <span className="material-symbols-outlined text-sm">
                                edit
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                milestone.images?.forEach((img) => {
                                  if (img.startsWith('http')) {
                                    mediaRequests
                                      .deleteFile(img)
                                      .catch(console.error)
                                  }
                                })
                                removeMilestone(milestone.index)
                                if (editingIndex === milestone.index) {
                                  setEditingIndex(null)
                                  setMilestoneDraft(defaultMilestone)
                                  setResetKey((prev) => prev + 1)
                                }
                                const newTotal = Math.ceil(
                                  (milestones.length - 1) / itemsPerPage
                                )
                                if (currentPage > newTotal && newTotal > 0)
                                  setCurrentPage(newTotal)
                              }}
                              className="p-1 text-neon-rose hover:text-foreground transition-colors"
                              title={t('btn.delete')}
                            >
                              <span className="material-symbols-outlined text-sm">
                                delete
                              </span>
                            </button>
                          </div>

                          <div className="flex items-start gap-4 pr-6">
                            {milestone.images &&
                              milestone.images.length > 0 && (
                                <div className="w-14 h-14 rounded-none overflow-hidden flex-shrink-0 border border-border/30">
                                  <img
                                    src={milestone.images[0]}
                                    alt="Thumbnail"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-foreground truncate mb-1">
                                {milestone.name}
                              </h4>
                              <div className="flex flex-col gap-1.5 mt-2 text-xs text-muted-foreground font-medium">
                                <div className="flex items-center gap-1.5 text-neon-cyan">
                                  <span className="material-symbols-outlined text-[12px]">
                                    calendar_today
                                  </span>
                                  <span className="leading-tight max-w-full break-words">
                                    {formatRange(
                                      milestone.startDate,
                                      milestone.endDate
                                    )}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="material-symbols-outlined text-[12px]">
                                    payments
                                  </span>
                                  <span className="leading-tight">
                                    €{milestone.budget?.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-6 pl-14 relative z-10">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="text-muted-foreground hover:text-foreground rounded-none"
                      >
                        <span className="material-symbols-outlined text-sm mr-1">
                          chevron_left
                        </span>
                        {t('common.prev')}
                      </Button>
                      <span className="text-xs text-muted-foreground font-medium tracking-wider">
                        {t('common.pageOf', {
                          current: currentPage,
                          total: totalPages
                        })}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="text-muted-foreground hover:text-foreground rounded-none"
                      >
                        {t('common.next')}
                        <span className="material-symbols-outlined text-sm ml-1">
                          chevron_right
                        </span>
                      </Button>
                    </div>
                  )}
                </>
              )
            })()}

            {milestones.length === 0 && (
              <p className="text-muted-foreground text-sm italic pl-14">
                {t('milestones.empty')}
              </p>
            )}

            {/* Empty state hint */}
            <div className="relative z-10 pl-14 pt-4">
              <div className="w-full aspect-[4/1] rounded-none border border-dashed border-border/30 flex items-center justify-center text-muted-foreground/30 text-xs">
                {t('milestones.emptyHint')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActionFooter
        onContinue={() => onStepChange?.('Team')}
        continueText={t('milestones.continueToTeam')}
      />
    </div>
  )
}
