import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ActionFooter } from './ActionFooter'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ImageUpload } from '@/components/ui/image-upload'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

import { useLaunchProject } from '@/contexts/LaunchProjectContext'
import { useState } from 'react'
import { toast } from 'sonner'
import { MilestoneSchema } from '@/schemas/projectSchema'

interface MilestonesStepProps {
  onStepChange?: (step: string) => void
}

export function MilestonesStep({ onStepChange }: MilestonesStepProps = {}) {
  const { project, addMilestone, updateMilestone, removeMilestone } =
    useLaunchProject()
  const { milestones } = project

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [resetKey, setResetKey] = useState(0)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const [newMilestone, setNewMilestone] = useState<{
    name: string
    description: string
    durationDays: number
    startDate: string
    endDate: string
    budget: number
    expectedOutcome: string
    images: string[]
    advantages: string
    challenges: string
  }>({
    name: '',
    description: '',
    durationDays: 0,
    startDate: '',
    endDate: '',
    budget: 0,
    expectedOutcome: '',
    images: [],
    advantages: '',
    challenges: ''
  })

  const totalBudget = milestones.reduce((sum, m) => sum + (m.budget || 0), 0)
  const totalDuration = milestones.reduce(
    (sum, m) => sum + (m.durationDays || 0),
    0
  )

  const remainingBudget = (project.basics.fundingGoal || 0) - totalBudget
  const projectTotalDurationDays =
    project.basics.startDate && project.basics.endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(project.basics.endDate).getTime() -
              new Date(project.basics.startDate).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0
  const remainingDuration =
    projectTotalDurationDays > 0
      ? projectTotalDurationDays - totalDuration
      : Infinity

  const handleDurationChange = (val: number) => {
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

    setNewMilestone((prev) => ({
      ...prev,
      durationDays: val,
      startDate: calculatedStartDate,
      endDate: calculatedEndDate
    }))
  }

  const handleAddMilestone = () => {
    const result = MilestoneSchema.safeParse(newMilestone)

    if (!result.success) {
      const errorMessages = result.error.issues
        .map((err: any) => err.message)
        .join(', ')
      toast.error('Missing Required Fields', {
        description: errorMessages
      })
      return
    }

    const originalBudget =
      editingIndex !== null ? milestones[editingIndex].budget : 0
    const originalDuration =
      editingIndex !== null ? milestones[editingIndex].durationDays : 0

    if (newMilestone.budget - originalBudget > remainingBudget) {
      toast.error('Budget Exceeded', {
        description: `This milestone exceeds the remaining budget of €${remainingBudget.toLocaleString()}.`
      })
      return
    }

    if (
      projectTotalDurationDays > 0 &&
      newMilestone.durationDays - originalDuration > remainingDuration
    ) {
      toast.error('Duration Exceeded', {
        description: `This milestone exceeds your remaining project timeline of ${remainingDuration} days.`
      })
      return
    }

    if (editingIndex !== null) {
      updateMilestone(editingIndex, {
        ...newMilestone,
        expectedOutcome: newMilestone.expectedOutcome || ''
      })
      setEditingIndex(null)
      toast.success('Milestone Updated')
    } else {
      addMilestone({
        ...newMilestone,
        expectedOutcome: newMilestone.expectedOutcome || ''
      })
      const newTotalPages = Math.ceil((milestones.length + 1) / itemsPerPage)
      setCurrentPage(newTotalPages)
      toast.success('Milestone Added')
    }
    setNewMilestone({
      images: [],
      name: '',
      description: '',
      durationDays: 0,
      startDate: '',
      endDate: '',
      budget: 0,
      expectedOutcome: '',
      advantages: '',
      challenges: ''
    })
    setResetKey((prev) => prev + 1)
  }

  return (
    <div className="max-w-6xl mx-auto pb-32">
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] tracking-tighter text-[#ecedf6] mb-3">
          Define Project Milestones
        </h1>
        <p className="text-[#a9abb3] text-lg max-w-2xl">
          Break your project into manageable phases for transparency and
          accountability.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Summary */}
        <div className="md:col-span-12 lg:col-span-8 space-y-8">
          {/* Budget/Time Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-[#22262f]/40 backdrop-blur-xl border-[#8ff5ff]/10 rounded-xl relative overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#a9abb3] text-sm">Total Budget</span>
                  <span className="text-[#8ff5ff] font-bold font-['Space_Grotesk'] text-lg">
                    €{totalBudget.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-[#22262f] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8ff5ff] to-[#7d98ff] shadow-[0_0_10px_rgba(143,245,255,0.4)] transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (totalBudget / (project.basics.fundingGoal || 1)) * 100)}%`
                    }}
                  ></div>
                </div>
                <p className="mt-3 text-xs text-[#a9abb3] italic">
                  Remaining: €{remainingBudget.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#22262f]/40 backdrop-blur-xl border-[#8ff5ff]/10 rounded-xl relative overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#a9abb3] text-sm">Total Duration</span>
                  <span className="text-[#8ff5ff] font-bold font-['Space_Grotesk'] text-lg">
                    {totalDuration} Days
                  </span>
                </div>
                <div className="h-2 bg-[#22262f] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8ff5ff] to-[#7d98ff] shadow-[0_0_10px_rgba(143,245,255,0.4)] transition-all duration-500"
                    style={{
                      width: `${projectTotalDurationDays > 0 ? Math.min(100, (totalDuration / projectTotalDurationDays) * 100) : 0}%`
                    }}
                  ></div>
                </div>
                <p className="mt-3 text-xs text-[#a9abb3] italic">
                  {remainingDuration !== Infinity
                    ? `Remaining timeline: ${remainingDuration} Days`
                    : `Total project phases: ${milestones.length}`}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Milestone Form */}
          <Card className="bg-[#10131a] rounded-xl border-[#45484f]/10 shadow-none">
            <CardContent className="p-8 space-y-6">
              <div>
                <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                  Milestone Name
                </Label>
                <Input
                  className="w-full bg-[#1c2028] border-none text-[#ecedf6] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8ff5ff] py-6 px-4"
                  placeholder="e.g., Phase 1: MVP Development"
                  type="text"
                  value={newMilestone.name}
                  onChange={(e) =>
                    setNewMilestone({ ...newMilestone, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                  Description
                </Label>
                <Textarea
                  className="w-full bg-[#1c2028] border-none text-[#ecedf6] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8ff5ff] p-4 resize-none shadow-none"
                  placeholder="Detail the specific tasks and technical requirements..."
                  rows={4}
                  value={newMilestone.description}
                  onChange={(e) =>
                    setNewMilestone({
                      ...newMilestone,
                      description: e.target.value
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-[#a9abb3] mb-1">
                    Duration (Days)
                  </Label>
                  <Input
                    className="w-full bg-[#1c2028] border-none text-[#ecedf6] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8ff5ff] py-6 px-4 shadow-none"
                    type="number"
                    value={newMilestone.durationDays || ''}
                    onChange={(e) =>
                      handleDurationChange(Number(e.target.value))
                    }
                  />
                  <p className="mt-2 text-[10px] text-[#a9abb3] uppercase tracking-wider">
                    Cannot exceed total project duration.
                  </p>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-[#a9abb3] mb-1">
                    Budget Allocation (€)
                  </Label>
                  <Input
                    className="w-full bg-[#1c2028] border-none text-[#ecedf6] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8ff5ff] py-6 px-4 shadow-none"
                    type="number"
                    value={newMilestone.budget || ''}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        budget: Number(e.target.value)
                      })
                    }
                  />
                  <p className="mt-2 text-[10px] text-[#a9abb3] uppercase tracking-wider">
                    Cannot exceed total funding goal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                    Advantages (Optional)
                  </Label>
                  <Input
                    className="w-full bg-[#1c2028] border-none text-[#ecedf6] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8ff5ff] py-6 px-4 shadow-none"
                    type="text"
                    value={newMilestone.advantages}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        advantages: e.target.value
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                    Challenges (Optional)
                  </Label>
                  <Input
                    className="w-full bg-[#1c2028] border-none text-[#ecedf6] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8ff5ff] py-6 px-4 shadow-none"
                    type="text"
                    value={newMilestone.challenges}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        challenges: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                    Reference Image
                  </Label>
                  <ImageUpload
                    key={resetKey}
                    maxImages={4}
                    onImagesChange={(files) => {
                      const urls = files.map((file) =>
                        URL.createObjectURL(file)
                      )
                      setNewMilestone({ ...newMilestone, images: urls })
                    }}
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                    Expected Outcome
                  </Label>
                  <div className="mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.15)] rounded-xl relative z-10">
                    <RichTextEditor
                      placeholder="Describe the expected results and deliverables of this milestone..."
                      value={newMilestone.expectedOutcome}
                      onChange={(val) =>
                        setNewMilestone({
                          ...newMilestone,
                          expectedOutcome: val
                        })
                      }
                    />
                  </div>
                  <div className="bg-[#0356ff]/10 border-l-4 border-[#7d98ff] p-4 flex gap-4 items-start">
                    <span className="material-symbols-outlined text-[#7d98ff] mt-1">
                      gavel
                    </span>
                    <p className="text-sm text-[#7d98ff]/90 leading-relaxed font-medium">
                      Đội ngũ admin sẽ kiểm duyệt khi đến deadline và sẽ approve
                      hay deny dựa theo kết quả hoàn thành theo từng giai đoạn,
                      do đó cần xác định kỹ thông tin này.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 gap-3">
                {editingIndex !== null && (
                  <Button
                    variant="ghost"
                    className="px-6 py-6 text-[#a9abb3] font-bold rounded-lg hover:text-white hover:bg-[#22262f] transition-all border-none"
                    onClick={() => {
                      setEditingIndex(null)
                      setNewMilestone({
                        images: [],
                        name: '',
                        description: '',
                        durationDays: 0,
                        startDate: '',
                        endDate: '',
                        budget: 0,
                        expectedOutcome: '',
                        advantages: '',
                        challenges: ''
                      })
                      setResetKey((prev) => prev + 1)
                    }}
                  >
                    Cancel Edit
                  </Button>
                )}
                <Button
                  className="px-8 py-6 bg-[#8ff5ff] text-[#005d63] font-bold rounded-lg hover:brightness-110 transition-all border-none"
                  onClick={handleAddMilestone}
                >
                  {editingIndex !== null ? 'Update Milestone' : 'Add Milestone'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Step-by-Step Summary */}
        <div className="md:col-span-12 lg:col-span-4 sticky top-24">
          <h3 className="text-xl font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8ff5ff]">
              analytics
            </span>
            Milestone Pipeline
          </h3>

          <div className="space-y-2.5 relative">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-4 bottom-10 w-[2px] bg-gradient-to-b from-[#8ff5ff] to-[#22262f]/20 z-0"></div>

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
                const startStr = start.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
                const endStr = end.toLocaleDateString('en-US', {
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
                        <div className="w-8 h-8 rounded-full bg-[#8ff5ff] border-4 border-[#0b0e14] flex items-center justify-center">
                          <span className="text-[#005d63] text-[10px] font-black">
                            {String(milestone.index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                      <Card className="bg-[#1c2028] rounded-xl border-[#45484f]/15 hover:border-[#8ff5ff]/30 transition-colors shadow-none group/card">
                        <CardContent className="p-l-5 relative">
                          <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setNewMilestone({
                                  name: milestone.name,
                                  description: milestone.description,
                                  durationDays: milestone.durationDays,
                                  budget: milestone.budget,
                                  expectedOutcome: milestone.expectedOutcome,
                                  advantages: milestone.advantages || '',
                                  challenges: milestone.challenges || '',
                                  images: milestone.images || [],
                                  startDate: '',
                                  endDate: ''
                                })
                                setEditingIndex(milestone.index)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                              }}
                              className="p-1 text-[#8ff5ff] hover:text-white transition-colors"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-sm">
                                edit
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                removeMilestone(milestone.index)
                                if (editingIndex === milestone.index) {
                                  setEditingIndex(null)
                                  setNewMilestone({
                                    images: [],
                                    name: '',
                                    description: '',
                                    durationDays: 0,
                                    startDate: '',
                                    endDate: '',
                                    budget: 0,
                                    expectedOutcome: '',
                                    advantages: '',
                                    challenges: ''
                                  })
                                  setResetKey((prev) => prev + 1)
                                }
                                const newTotal = Math.ceil(
                                  (milestones.length - 1) / itemsPerPage
                                )
                                if (currentPage > newTotal && newTotal > 0)
                                  setCurrentPage(newTotal)
                              }}
                              className="p-1 text-[#ff716c] hover:text-white transition-colors"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-sm">
                                delete
                              </span>
                            </button>
                          </div>

                          <div className="flex items-start gap-4 pr-6">
                            {milestone.images &&
                              milestone.images.length > 0 && (
                                <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border border-[#45484f]/30">
                                  <img
                                    src={milestone.images[0]}
                                    alt="Thumbnail"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[#ecedf6] truncate mb-1">
                                {milestone.name}
                              </h4>
                              <div className="flex flex-col gap-1.5 mt-2 text-xs text-[#a9abb3] font-medium">
                                <div className="flex items-center gap-1.5 text-[#8ff5ff]">
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
                        className="text-[#a9abb3] hover:text-[#ecedf6]"
                      >
                        <span className="material-symbols-outlined text-sm mr-1">
                          chevron_left
                        </span>
                        Prev
                      </Button>
                      <span className="text-xs text-[#a9abb3] font-medium tracking-wider">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="text-[#a9abb3] hover:text-[#ecedf6]"
                      >
                        Next
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
              <p className="text-[#a9abb3] text-sm italic pl-14">
                No milestones added yet.
              </p>
            )}

            {/* Empty state hint */}
            <div className="relative z-10 pl-14 pt-4">
              <div className="w-full aspect-[4/1] rounded-xl border-2 border-dashed border-[#45484f]/30 flex items-center justify-center text-[#45484f] text-xs">
                Fill the form to add a milestone
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActionFooter
        onContinue={() => onStepChange?.('Team')}
        continueText="Continue to Team"
      />
    </div>
  )
}
