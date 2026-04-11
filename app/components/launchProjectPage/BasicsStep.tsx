import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { format } from 'date-fns'
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

export function BasicsStep() {
  const [launchDate, setLaunchDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

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
              />
              <span className="absolute right-4 bottom-4 text-[10px] text-[#a9abb3]/50">
                0 / 60
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
              />
              <span className="absolute right-4 bottom-4 text-[10px] text-[#a9abb3]/50">
                0 / 135
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
              <Select>
                <SelectTrigger className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl px-4 py-6 focus:ring-1 focus:ring-[#8ff5ff]">
                  <SelectValue placeholder="Tech" />
                </SelectTrigger>
                <SelectContent className="bg-[#161a21] border-[#45484f]/20">
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="comics">Comics</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl px-4 py-6 focus:ring-1 focus:ring-[#8ff5ff]">
                  <SelectValue placeholder="Software" />
                </SelectTrigger>
                <SelectContent className="bg-[#161a21] border-[#45484f]/20">
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="web3">Web3</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-[#a9abb3]/60">
                Secondary Category (Optional)
              </label>
              <Select>
                <SelectTrigger className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl px-4 py-6 focus:ring-1 focus:ring-[#8ff5ff]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#161a21] border-[#45484f]/20">
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full bg-[#10131a] border-[#45484f]/30 rounded-xl px-4 py-6 focus:ring-1 focus:ring-[#8ff5ff]">
                  <SelectValue placeholder="Select Subcategory" />
                </SelectTrigger>
                <SelectContent className="bg-[#161a21] border-[#45484f]/20">
                  <SelectItem value="digital-art">Digital Art</SelectItem>
                  <SelectItem value="illustration">Illustration</SelectItem>
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
            <div className="relative group/media cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-[#45484f]/30 hover:border-[#8ff5ff]/50 transition-all bg-[#10131a] aspect-video flex flex-col items-center justify-center">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover/media:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAj4Pj2TSQ_4WbzgS6HjYgT8HNCZrFvwPqH4KGIQ_KdWHqQ1S5148d4lfAXkufRswmrtusm1dmpv1Ftm9FdBjY7KiA_Oo7k65YxQyY6LTi_zoGEz-82pNrD3LwNGR3aZLu1YaGX-yMHxZHGUQBNO5mWX2mOAItQ7z3El5qcPsuQfL5dcX52oc-rcCBK3iQwDHWjOJmZHqUZpRwROzgLFJ5CEuq9YGkJMGie6F2hiXKwBkQlLhI-BbeQhiPcMXFD_JTn5-2IG4a8I8"
                alt="Upload preview"
              />
              <div className="relative z-10 flex flex-col items-center text-center p-6">
                <span className="material-symbols-outlined text-4xl text-[#8ff5ff] mb-3">
                  add_photo_alternate
                </span>
                <h4 className="font-bold text-lg mb-1">Project Image</h4>
                <p className="text-xs text-[#a9abb3]">
                  Min 1024x576 pixels (16:9 ratio). JPEG, PNG, or TIFF.
                </p>
              </div>
            </div>

            {/* Video Upload */}
            <div className="relative group/video cursor-pointer rounded-xl border border-[#45484f]/30 hover:bg-[#1c2028] transition-all bg-[#10131a] p-8 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#22262f] flex items-center justify-center text-[#8ff5ff] group-hover/video:bg-[#8ff5ff] group-hover/video:text-[#005d63] transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  videocam
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold">Project Video (Optional)</h4>
                <p className="text-sm text-[#a9abb3]">
                  Up to 5GB. MP4, MOV, or AVI format. High definition
                  recommended.
                </p>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest text-[#8ff5ff] border border-[#8ff5ff]/20 px-4 py-2 rounded-lg group-hover/video:bg-[#8ff5ff]/10 transition-colors">
                Upload
              </button>
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
                      !launchDate && 'text-[#45484f]'
                    )}
                  >
                    <span className="material-symbols-outlined text-[#8ff5ff] mr-2 text-xl">
                      calendar_month
                    </span>
                    {launchDate ? (
                      format(launchDate, 'PPP')
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
                    selected={launchDate}
                    onSelect={setLaunchDate}
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
                          onSelect={setEndDate}
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

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-0 md:left-[var(--sidebar-width)] right-0 h-24 bg-[#0b0e14]/80 backdrop-blur-md border-t border-[#45484f]/15 flex items-center justify-between px-6 md:px-12 z-40 transition-all duration-300">
        <button className="flex items-center gap-2 text-[#a9abb3] hover:text-[#ecedf6] transition-colors font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs">
          <span className="material-symbols-outlined text-sm">
            chevron_left
          </span>
          Discard Changes
        </button>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="px-8 py-3 h-12 rounded-full font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs border-[#45484f]/30 hover:bg-[#22262f] bg-transparent text-[#ecedf6] transition-colors"
          >
            Save Draft
          </Button>
          <Button className="bg-[#8ff5ff] hover:bg-[#00eefc] text-[#005d63] px-10 py-3 h-12 rounded-full font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(143,245,255,0.4)] hover:shadow-[0_0_30px_rgba(143,245,255,0.6)] transition-all active:scale-95">
            Continue to Funding
          </Button>
        </div>
      </div>
    </div>
  )
}
