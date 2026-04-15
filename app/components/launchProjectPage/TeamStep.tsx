import { useState } from 'react'
import { ActionFooter } from './ActionFooter'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function TeamStep() {
  const [role, setRole] = useState('Lead Developer')
  const isFounder = role === 'Founder'

  return (
    <div className="max-w-6xl mx-auto pb-32">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-['Space_Grotesk'] font-bold tracking-tight text-[#ecedf6] mb-4">
          Build Your Team
        </h1>
        <p className="text-[#a9abb3] text-lg max-w-2xl">
          Add core contributors to build trust with your backers. Transparent
          team structures lead to 40% higher funding success.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Section */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-[#282c36]/40 backdrop-blur-xl border border-[#8ff5ff]/10 pt-8 pb-4 rounded-xl relative overflow-hidden shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ac89ff]/10 blur-3xl -mr-16 -mt-16 rounded-full"></div>

            <CardContent>
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-[#8ff5ff] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">person_add</span>
                Contributor Details
              </h2>

              <form className="space-y-5">
                {/* Platform Member Search */}
                <div
                  className={`relative group transition-all ${isFounder ? 'opacity-30 pointer-events-none' : ''}`}
                >
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#8ff5ff]/70 mb-2">
                    Search for platform members
                  </Label>
                  <div className="relative focus-within:text-[#00eefc]">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg transition-colors">
                      search
                    </span>
                    <Input
                      className="w-full bg-[#1c2028] border border-white/5 rounded-lg text-[#ecedf6] focus-visible:ring-1 focus-visible:ring-[#8ff5ff]/50 placeholder:text-slate-600 transition-all h-12 pl-10 pr-4"
                      placeholder="Username, wallet, or email..."
                      type="text"
                    />
                  </div>

                  {/* Mock search dropdown (initially hidden in real logic) */}
                  <div className="hidden absolute z-20 w-full mt-1 bg-[#22262f] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    <div className="p-3 hover:bg-[#8ff5ff]/10 cursor-pointer flex items-center gap-3 border-b border-white/5">
                      <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs uppercase">
                        VS
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-[#ecedf6]">
                          Vitalik S.
                        </div>
                        <div className="text-[10px] text-slate-500">
                          vitalik@ethereum.org
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 h-[1px] bg-gradient-to-r from-[#8ff5ff]/30 to-transparent"></div>
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                    Full Name
                  </Label>
                  <Input
                    className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] focus-visible:ring-1 focus-visible:ring-[#8ff5ff]/50 placeholder:text-slate-600 transition-all h-12 px-4 shadow-none"
                    placeholder="e.g. Satoshi Nakamoto"
                    type="text"
                  />
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                    Email Address
                  </Label>
                  <Input
                    className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] focus-visible:ring-1 focus-visible:ring-[#8ff5ff]/50 placeholder:text-slate-600 transition-all h-12 px-4 shadow-none"
                    placeholder="name@project.com"
                    type="email"
                  />
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                    Wallet Address
                  </Label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8ff5ff]/60 text-lg">
                      account_balance_wallet
                    </span>
                    <Input
                      className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] focus-visible:ring-1 focus-visible:ring-[#8ff5ff]/50 placeholder:text-slate-600 transition-all h-12 pl-10 pr-4 shadow-none"
                      placeholder="0x..."
                      type="text"
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                    Role
                  </Label>
                  <Select value={role} onValueChange={(v) => setRole(v)}>
                    <SelectTrigger className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] focus:ring-1 focus:ring-[#8ff5ff]/50 transition-all h-12 px-4 shadow-none">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#22262f] border-[#45484f]/30 text-[#ecedf6]">
                      <SelectItem value="Founder">Founder</SelectItem>
                      <SelectItem value="Lead Developer">
                        Lead Developer
                      </SelectItem>
                      <SelectItem value="Designer">Designer</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Advisor">Advisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                    Role Description
                  </Label>
                  <Textarea
                    className="w-full bg-[#1c2028] border-none rounded-lg text-[#ecedf6] focus-visible:ring-1 focus-visible:ring-[#8ff5ff]/50 placeholder:text-slate-600 transition-all py-3 px-4 resize-none shadow-none"
                    placeholder="Briefly describe their responsibilities..."
                    rows={3}
                  />
                </div>

                <Button
                  className="w-full h-14 bg-gradient-to-r from-[#8ff5ff] to-[#00eefc] text-[#005359] font-['Space_Grotesk'] font-bold rounded-full hover:shadow-[0_0_30px_rgba(143,245,255,0.4)] shadow-[0_0_20px_rgba(143,245,255,0.2)] active:scale-95 transition-all text-base mt-4 border-none"
                  type="button"
                >
                  <span className="material-symbols-outlined mr-2">
                    group_add
                  </span>
                  Add Member
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* List Section */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-[#ecedf6]">
              Active Roster{' '}
              <span className="text-sm text-[#a9abb3] font-normal ml-2">
                (3 members)
              </span>
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#45484f]/30 to-transparent ml-6"></div>
          </div>

          <div className="space-y-4">
            {/* Team Card 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center gap-6 p-4 bg-[#10131a] rounded-xl border border-white/5">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#8ff5ff]/20">
                  <img
                    alt="Member Avatar"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdZf4kGu2PSRxplAKC2bMuNdQShp9MOK2D35pZ5qZrhnQS23Tf_a_3K-SHDiA72-sxmmDXl6E1tDbCp4tvwV3R42iKFNhNIO-X0I2w1Cjma8aDNTtQE32kBlyzeY7j5fcmWV01rTu31_pmy8gYlCMdUwRkibdOE4dE6ijtWJn49dOGY9abBboIM2Wvi0YyOs6kBW3rzXOxhjVOyf6cU16n_wrZbMe_FUWJBQktZSvNOTF5CKC_y-VEsOKDYmgNz0LjsNMDZFJYsew"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#ecedf6]">
                      Alex Rivera
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#8ff5ff]/10 border border-[#8ff5ff]/20 text-[9px] uppercase font-bold text-[#8ff5ff] tracking-widest">
                      Founder
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 text-[#a9abb3] text-xs">
                      <span className="material-symbols-outlined text-sm">
                        account_balance_wallet
                      </span>
                      <code className="font-mono opacity-80">0x71C...4e21</code>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-[#a9abb3] hover:text-[#ac89ff] transition-colors">
                        <span className="material-symbols-outlined text-base">
                          link
                        </span>
                      </button>
                      <button className="text-[#a9abb3] hover:text-[#ac89ff] transition-colors">
                        <span className="material-symbols-outlined text-base">
                          alternate_email
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-slate-600 hover:text-[#8ff5ff] transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      edit
                    </span>
                  </button>
                  <button className="p-2 text-slate-600 hover:text-[#ff716c] transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Team Card 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center gap-6 p-4 bg-[#10131a] rounded-xl border border-white/5">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#ac89ff]/20">
                  <img
                    alt="Member Avatar"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ2GHHqcpH1pc1rTr77BiBxkv3QEGKkaeYM9D-1TfxE8OKH_Q-WnjXYXJt8ecOWCfdR6zUwNUcsNcw6aZlqj213Wsr5r4QxjBDdSdr_tt-5MP5g1fCeYmSCd-5EohnbtJ69-URASmga1b9_ylfXFGKzCn7CbDNAsc_byaoh-6iYP__cl4n6mrtUEpOcGG9vEAE8UV8A6oAXD-BPqDcqs7LK2rOwjG_USIaWVt8PJ20QQKYuq2H4bmSjhZVU4apcwjwmpf1j81-u8A"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#ecedf6]">
                      Jordan Chen
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#ac89ff]/10 border border-[#ac89ff]/20 text-[9px] uppercase font-bold text-[#ac89ff] tracking-widest">
                      Lead Designer
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 text-[#a9abb3] text-xs">
                      <span className="material-symbols-outlined text-sm">
                        account_balance_wallet
                      </span>
                      <code className="font-mono opacity-80">0x3A2...9F12</code>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-[#a9abb3] hover:text-[#ac89ff] transition-colors">
                        <span className="material-symbols-outlined text-base">
                          link
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-slate-600 hover:text-[#8ff5ff] transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      edit
                    </span>
                  </button>
                  <button className="p-2 text-slate-600 hover:text-[#ff716c] transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Team Card 3 (Recessed/Empty state style) */}
            <div className="relative p-6 bg-black/50 rounded-xl border border-dashed border-[#45484f]/30 flex items-center justify-center group cursor-pointer hover:border-[#8ff5ff]/50 transition-all">
              <div className="text-center py-2">
                <div className="w-10 h-10 rounded-full bg-[#1c2028] flex items-center justify-center mx-auto mb-2 group-hover:bg-[#8ff5ff]/20 transition-all">
                  <span className="material-symbols-outlined text-slate-500 group-hover:text-[#8ff5ff] text-xl">
                    person_add_alt
                  </span>
                </div>
                <span className="text-[10px] font-['Space_Grotesk'] text-slate-500 uppercase tracking-widest group-hover:text-[#8ff5ff] transition-all">
                  Invite Marketing Lead
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ActionFooter continueText="Complete Setup" />
    </div>
  )
}
