import { Textarea } from '@/components/ui/textarea'

export function StoryStep() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 pb-20">
      {/* Editor Column */}
      <div className="col-span-12 lg:col-span-8 space-y-12">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-bold font-['Space_Grotesk'] tracking-tight text-[#ecedf6] mb-2">
            Tell Your Story
          </h1>
          <p className="text-[#a9abb3] text-lg">
            Describe what you're building and why it matters to the community.
          </p>
        </header>

        {/* Media Embed Section */}
        <section className="relative group">
          <div className="w-full aspect-video rounded-2xl bg-[#161a21] overflow-hidden border border-[#45484f]/15 flex flex-col items-center justify-center text-center p-8 transition-all hover:border-[#8ff5ff]/30 relative z-10">
            <div className="w-20 h-20 rounded-full bg-[#8ff5ff]/10 flex items-center justify-center mb-4 z-20">
              <span className="material-symbols-outlined text-[#8ff5ff] text-4xl">
                video_library
              </span>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-[#ecedf6] z-20">
              Add a project video
            </h4>
            <p className="text-[#a9abb3] mb-6 max-w-sm z-20">
              A personal video increases funding success by up to 40%.
            </p>
            <div className="flex gap-4 z-20">
              <button className="px-6 py-2 rounded-lg bg-[#22262f] hover:bg-[#282c36] text-[#ecedf6] border border-[#45484f]/20 transition-all font-medium">
                Upload MP4
              </button>
              <button className="px-6 py-2 rounded-lg bg-[#8ff5ff] text-[#005359] font-medium hover:brightness-110 transition-all shadow-[0_0_15px_rgba(143,245,255,0.2)]">
                Paste URL
              </button>
            </div>
            {/* Background Aesthetic Image */}
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none grayscale z-0 mix-blend-overlay"
              alt="Studio background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEJ4pZNnf9qkp5L8nmKHTbJT231kXXnJcI8gOT7OsKTmjSK7jK-u1nh1xv45O8O9KoIjXGXKW_K3bC4NjkSS_2qKpN7FvKoe1eqZ5hqoeCKYAWIEfnT0Yj0684DMfTW4tiekg0rmLCbVQHnCL5KhSMvmOk8FXspJXwCneR1URSRX4tKrDwldcobOQaL9ad8TdciEx_UkPAijTULQojIir23A4Im0EDbnUoqT1gXoa-LqsJe-BTzsILHf3QN1Hd2RP72f9qIIlNkd4"
            />
          </div>
        </section>

        {/* Rich Text Editor Container */}
        <section className="space-y-4">
          <label className="text-sm font-semibold text-[#8ff5ff] uppercase tracking-widest">
            Project Description
          </label>
          <div className="rounded-2xl border border-[#45484f]/15 bg-[#161a21] overflow-hidden">
            {/* Toolbar (Static UI for now) */}
            <div className="flex items-center gap-1 p-2 border-b border-[#45484f]/15 bg-[#1c2028]">
              <button className="p-2 rounded-lg text-[#a9abb3] hover:text-[#8ff5ff] hover:bg-[#8ff5ff]/10 transition-all">
                <span className="material-symbols-outlined text-sm">
                  format_bold
                </span>
              </button>
              <button className="p-2 rounded-lg text-[#a9abb3] hover:text-[#8ff5ff] hover:bg-[#8ff5ff]/10 transition-all">
                <span className="material-symbols-outlined text-sm">
                  format_italic
                </span>
              </button>
              <button className="p-2 rounded-lg text-[#a9abb3] hover:text-[#8ff5ff] hover:bg-[#8ff5ff]/10 transition-all">
                <span className="material-symbols-outlined text-sm">
                  format_list_bulleted
                </span>
              </button>
              <button className="p-2 rounded-lg text-[#a9abb3] hover:text-[#8ff5ff] hover:bg-[#8ff5ff]/10 transition-all">
                <span className="material-symbols-outlined text-sm">
                  format_quote
                </span>
              </button>
              <div className="h-6 w-[1px] bg-[#45484f]/30 mx-2"></div>
              <button className="p-2 rounded-lg text-[#a9abb3] hover:text-[#8ff5ff] hover:bg-[#8ff5ff]/10 transition-all">
                <span className="material-symbols-outlined text-sm">image</span>
              </button>
              <button className="p-2 rounded-lg text-[#a9abb3] hover:text-[#8ff5ff] hover:bg-[#8ff5ff]/10 transition-all">
                <span className="material-symbols-outlined text-sm">link</span>
              </button>
              <button className="p-2 rounded-lg text-[#a9abb3] hover:text-[#8ff5ff] hover:bg-[#8ff5ff]/10 transition-all">
                <span className="material-symbols-outlined text-sm">code</span>
              </button>
            </div>
            {/* Text Area */}
            <div className="p-0 bg-[#10131a]/50 h-[400px]">
              <Textarea
                className="w-full h-full bg-transparent border-none focus-visible:ring-0 text-[#ecedf6] text-lg p-8 resize-none placeholder:text-[#a9abb3] placeholder:italic rounded-none focus:outline-none focus:ring-0"
                placeholder="Start typing your project's story here...&#10;&#10;Use this space to explain the core problem you are solving, your technical approach, and how you will use the funds. You can drag and drop images directly into this area."
              />
            </div>
          </div>
        </section>

        {/* Risks Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#8ff5ff] uppercase tracking-widest">
              Risks & Challenges
            </label>
            <span className="text-xs text-[#a9abb3] bg-[#22262f] px-3 py-1 rounded-full">
              Required for compliance
            </span>
          </div>
          <div className="p-2 rounded-2xl border border-[#45484f]/15 bg-[#10131a]">
            <Textarea
              className="w-full bg-transparent border-none focus-visible:ring-0 text-[#ecedf6] placeholder:text-[#a9abb3] resize-none focus:outline-none focus:ring-0"
              placeholder="Be transparent about potential technical hurdles, market risks, or regulatory challenges..."
              rows={4}
            />
          </div>
        </section>

        {/* Bottom Action */}
        <footer className="flex justify-between items-center py-10 border-t border-[#45484f]/15">
          <button className="flex items-center gap-2 text-[#a9abb3] hover:text-[#ecedf6] transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Rewards
          </button>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-full border border-[#73757d]/40 text-[#ecedf6] font-medium hover:bg-[#22262f] transition-all">
              Save Preview
            </button>
            <button className="px-10 py-3 rounded-full bg-gradient-to-r from-[#8ff5ff] to-[#00deec] text-[#005359] font-bold hover:shadow-[0_0_20px_rgba(143,245,255,0.4)] active:scale-95 transition-all">
              Next: Team
            </button>
          </div>
        </footer>
      </div>

      {/* Sidebar Tips Column */}
      <aside className="col-span-12 lg:col-span-4 space-y-6">
        {/* Writing Tips Card */}
        <div className="bg-[#22262f]/40 backdrop-blur-xl p-6 rounded-3xl border border-[#45484f]/15 sticky top-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-[#7d98ff]/10 text-[#7d98ff]">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <h3 className="font-['Space_Grotesk'] font-bold text-xl text-[#ecedf6]">
              Writing Tips
            </h3>
          </div>

          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8ff5ff]/20 flex items-center justify-center text-xs text-[#8ff5ff] font-bold">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#ecedf6] mb-1">
                  Make it personal
                </h4>
                <p className="text-xs text-[#a9abb3] leading-relaxed">
                  Share why you're passionate about this project. People back
                  people, not just code.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8ff5ff]/20 flex items-center justify-center text-xs text-[#8ff5ff] font-bold">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#ecedf6] mb-1">
                  Break it down
                </h4>
                <p className="text-xs text-[#a9abb3] leading-relaxed">
                  Use headers, bullet points, and images to make your story easy
                  to scan for busy investors.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8ff5ff]/20 flex items-center justify-center text-xs text-[#8ff5ff] font-bold">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#ecedf6] mb-1">
                  Define the 'Why'
                </h4>
                <p className="text-xs text-[#a9abb3] leading-relaxed">
                  Clearly state the utility of your project. What value does it
                  add to the EtherFlow ecosystem?
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-8 pt-8 border-t border-[#45484f]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#a9abb3]">
                Profile Completeness
              </span>
              <span className="text-xs font-bold text-[#8ff5ff]">65%</span>
            </div>
            <div className="h-1.5 w-full bg-[#22262f] rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-[#8ff5ff] to-[#7d98ff] rounded-full shadow-[0_0_8px_rgba(143,245,255,0.5)]"></div>
            </div>
          </div>
        </div>

        {/* Community Examples */}
        <div className="p-6 rounded-3xl bg-[#10131a] border border-[#45484f]/15">
          <h4 className="text-sm font-bold text-[#ecedf6] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ac89ff] text-sm">
              verified
            </span>
            Best Story Examples
          </h4>
          <div className="space-y-3">
            <a className="block p-3 rounded-xl hover:bg-[#22262f] transition-colors group cursor-pointer">
              <p className="text-xs font-medium text-[#ecedf6] group-hover:text-[#8ff5ff]">
                Neon Nexus Protocol
              </p>
              <p className="text-[10px] text-[#a9abb3] mt-1">
                Featured for clear roadmap & risks.
              </p>
            </a>
            <a className="block p-3 rounded-xl hover:bg-[#22262f] transition-colors group cursor-pointer">
              <p className="text-xs font-medium text-[#ecedf6] group-hover:text-[#8ff5ff]">
                AquaScale DAO
              </p>
              <p className="text-[10px] text-[#a9abb3] mt-1">
                Excellent use of embedded technical diagrams.
              </p>
            </a>
          </div>
        </div>
      </aside>
    </div>
  )
}
