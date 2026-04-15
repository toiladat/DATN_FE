import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ActionFooter } from './ActionFooter'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ImageUpload } from '@/components/ui/image-upload'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export function MilestonesStep() {
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
                    €50,000
                  </span>
                </div>
                <div className="h-2 bg-[#22262f] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#8ff5ff] to-[#7d98ff] w-1/2 shadow-[0_0_10px_rgba(143,245,255,0.4)]"></div>
                </div>
                <p className="mt-3 text-xs text-[#a9abb3] italic">
                  Remaining: €25,000
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#22262f]/40 backdrop-blur-xl border-[#8ff5ff]/10 rounded-xl relative overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#a9abb3] text-sm">Total Duration</span>
                  <span className="text-[#8ff5ff] font-bold font-['Space_Grotesk'] text-lg">
                    60 Days
                  </span>
                </div>
                <div className="h-2 bg-[#22262f] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#8ff5ff] to-[#7d98ff] w-3/4 shadow-[0_0_10px_rgba(143,245,255,0.4)]"></div>
                </div>
                <p className="mt-3 text-xs text-[#a9abb3] italic">
                  Remaining: 25 Days
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
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                    Challenges (Optional)
                  </Label>
                  <Input
                    className="w-full bg-[#1c2028] border-none text-[#ecedf6] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8ff5ff] py-6 px-4 shadow-none"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                    Reference Image (Optional)
                  </Label>
                  <ImageUpload maxImages={4} />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-[#a9abb3] mb-2">
                    Expected Outcome
                  </Label>
                  <div className="mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.15)] rounded-xl relative z-10">
                    <RichTextEditor placeholder="Describe the expected results and deliverables of this milestone..." />
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

              <div className="flex justify-end pt-4">
                <Button className="px-8 py-6 bg-[#8ff5ff] text-[#005d63] font-bold rounded-lg hover:brightness-110 transition-all border-none">
                  Add Milestone
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

          <div className="space-y-4 relative">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-4 bottom-24 w-[2px] bg-gradient-to-b from-[#8ff5ff] to-[#22262f]/20 z-0"></div>

            {/* Milestone Card 1 */}
            <div className="relative z-10 pl-14">
              <div className="absolute left-0 top-1 w-14 h-14 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#8ff5ff] border-4 border-[#0b0e14] flex items-center justify-center">
                  <span className="text-[#005d63] text-[10px] font-black">
                    01
                  </span>
                </div>
              </div>
              <Card className="bg-[#1c2028] rounded-xl border-[#45484f]/15 hover:border-[#8ff5ff]/30 transition-colors shadow-none">
                <CardContent className="p-5">
                  <h4 className="font-bold text-[#ecedf6]">Genesis Block</h4>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#a9abb3] font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        calendar_today
                      </span>{' '}
                      15 Days
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        payments
                      </span>{' '}
                      €10,000
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Milestone Card 2 */}
            <div className="relative z-10 pl-14">
              <div className="absolute left-0 top-1 w-14 h-14 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#22262f] border-4 border-[#0b0e14] flex items-center justify-center">
                  <span className="text-[#a9abb3] text-[10px] font-black">
                    02
                  </span>
                </div>
              </div>
              <Card className="bg-[#1c2028] rounded-xl border-[#45484f]/15 hover:border-[#8ff5ff]/30 transition-colors shadow-none">
                <CardContent className="p-5">
                  <h4 className="font-bold text-[#ecedf6]">
                    Neural Network Alpha
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#a9abb3] font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        calendar_today
                      </span>{' '}
                      20 Days
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        payments
                      </span>{' '}
                      €15,000
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add Button */}
            <div className="relative z-10 pl-14 pt-4">
              <button className="w-full group aspect-[4/1] rounded-xl border-2 border-dashed border-[#45484f]/30 hover:border-[#8ff5ff]/50 hover:bg-[#8ff5ff]/5 transition-all flex items-center justify-center">
                <span className="material-symbols-outlined text-[#45484f] group-hover:text-[#8ff5ff] transition-colors text-3xl">
                  add_circle
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ActionFooter continueText="Continue to Story" />
    </div>
  )
}
