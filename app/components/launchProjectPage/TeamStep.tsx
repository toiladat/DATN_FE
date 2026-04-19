import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { useLaunchProject } from '@/contexts/LaunchProjectContext'
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
import { ActionFooter } from './ActionFooter'
import { toast } from 'sonner'

interface TeamStepProps {
  onStepChange?: (step: string) => void
}

export function TeamStep({ onStepChange }: TeamStepProps = {}) {
  const { project, setTeam } = useLaunchProject()
  const { team } = project

  const [newMember, setNewMember] = useState({
    id: '',
    name: '',
    email: '',
    role: 'Lead Developer',
    roleDescription: '',
    wallet: '',
    avatar: ''
  })

  const isFounder = newMember.role === 'Founder'

  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  // Mock DB of users
  const MOCK_USERS = [
    {
      id: 'usr_001',
      name: 'Vitalik S.',
      email: 'vitalik@ethereum.org',
      wallet: '0x1A2B...3C4D',
      avatar: '',
      initials: 'VS'
    },
    {
      id: 'usr_002',
      name: 'Satoshi N.',
      email: 'satoshi@bitcoin.org',
      wallet: 'bc1Q...XYZ',
      avatar: '',
      initials: 'SN'
    },
    {
      id: 'usr_003',
      name: 'Alex T.',
      email: 'alex@radiant.void',
      wallet: '0x9F8E...7D6C',
      avatar: '',
      initials: 'AT'
    }
  ]

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    setIsSearching(true)
    setShowDropdown(true)

    const timer = setTimeout(() => {
      const results = MOCK_USERS.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.wallet.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const selectUser = (user: any) => {
    setNewMember({
      ...newMember,
      id: user.id,
      name: user.name,
      email: user.email,
      wallet: user.wallet,
      avatar: user.avatar
    })
    setSearchQuery('')
    setShowDropdown(false)
  }

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.wallet) {
      toast.error('Missing Information', {
        description:
          'Please search and select a platform member to fill in the required details.'
      })
      return
    }

    if (!newMember.roleDescription.trim()) {
      toast.error('Missing Role Description', {
        description:
          "Please provide a brief description of this member's responsibilities."
      })
      return
    }

    const isDuplicate = team.some(
      (member) =>
        member.email === newMember.email || member.wallet === newMember.wallet
    )
    if (isDuplicate) {
      toast.error('Member Already Added', {
        description: 'This user is already part of your team roster.'
      })
      return
    }

    setTeam([...team, newMember])
    setNewMember({
      id: '',
      name: '',
      email: '',
      role: 'Lead Developer',
      roleDescription: '',
      wallet: '',
      avatar: ''
    })
    toast.success('Member Added', {
      description: `${newMember.name} is now part of the team.`
    })
  }

  const removeMember = (index: number) => {
    const updatedTeam = team.filter((_, i) => i !== index)
    setTeam(updatedTeam)
  }

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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => {
                        if (searchQuery) setShowDropdown(true)
                      }}
                      onBlur={() =>
                        setTimeout(() => setShowDropdown(false), 200)
                      }
                    />
                  </div>

                  {showDropdown && (
                    <div className="absolute z-20 w-full mt-1 bg-[#22262f] border border-[#8ff5ff]/20 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                      {isSearching ? (
                        <div className="p-4 text-center text-xs text-[#a9abb3]">
                          Searching database...
                        </div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((user, i) => (
                          <div
                            key={i}
                            onMouseDown={() => selectUser(user)}
                            className="p-3 hover:bg-[#8ff5ff]/10 cursor-pointer flex items-center gap-3 border-b border-white/5"
                          >
                            <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center text-[#8ff5ff] font-bold text-xs uppercase">
                              {user.initials}
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-[#ecedf6]">
                                {user.name}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-[#a9abb3]">
                          No users found on Radiant Void.
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-2 h-[1px] bg-gradient-to-r from-[#8ff5ff]/30 to-transparent"></div>
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                    Full Name
                  </Label>
                  <Input
                    className="w-full bg-[#161920] border-none rounded-lg text-[#656975] h-12 px-4 shadow-none opacity-60 cursor-not-allowed focus-visible:ring-0"
                    placeholder="Search above to populate..."
                    type="text"
                    readOnly
                    value={newMember.name}
                  />
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                    Email Address
                  </Label>
                  <Input
                    className="w-full bg-[#161920] border-none rounded-lg text-[#656975] h-12 px-4 shadow-none opacity-60 cursor-not-allowed focus-visible:ring-0"
                    placeholder="Search above to populate..."
                    type="email"
                    readOnly
                    value={newMember.email}
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
                      className="w-full bg-[#161920] border-none rounded-lg text-[#656975] h-12 pl-10 pr-4 shadow-none opacity-60 cursor-not-allowed focus-visible:ring-0"
                      placeholder="Search above to populate..."
                      type="text"
                      readOnly
                      value={newMember.wallet}
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-[#a9abb3] mb-2">
                    Role
                  </Label>
                  <Select
                    value={newMember.role}
                    onValueChange={(v) =>
                      setNewMember({ ...newMember, role: v })
                    }
                  >
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
                    value={newMember.roleDescription}
                    onChange={(e) =>
                      setNewMember({
                        ...newMember,
                        roleDescription: e.target.value
                      })
                    }
                  />
                </div>

                <Button
                  className="w-full h-14 bg-gradient-to-r from-[#8ff5ff] to-[#00eefc] text-[#005359] font-['Space_Grotesk'] font-bold rounded-full hover:shadow-[0_0_30px_rgba(143,245,255,0.4)] shadow-[0_0_20px_rgba(143,245,255,0.2)] active:scale-95 transition-all text-base mt-4 border-none"
                  type="button"
                  onClick={handleAddMember}
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
                ({team.length} members)
              </span>
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#45484f]/30 to-transparent ml-6"></div>
          </div>

          <div className="space-y-4">
            {team.map((member, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center gap-6 p-4 bg-[#10131a] rounded-xl border border-white/5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#8ff5ff]/20 flex items-center justify-center bg-[#1c2028]">
                    {member.avatar ? (
                      <img
                        alt="Member Avatar"
                        className="w-full h-full object-cover"
                        src={member.avatar}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-[#8ff5ff] text-3xl">
                        person
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#ecedf6]">
                        {member.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#8ff5ff]/10 border border-[#8ff5ff]/20 text-[9px] uppercase font-bold text-[#8ff5ff] tracking-widest">
                        {member.role}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 text-[#a9abb3] text-xs">
                        <span className="material-symbols-outlined text-sm">
                          account_balance_wallet
                        </span>
                        <code className="font-mono opacity-80">
                          {member.wallet.substring(0, 6)}...
                          {member.wallet.substring(member.wallet.length - 4)}
                        </code>
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="text-[#a9abb3] hover:text-[#ac89ff] transition-colors"
                          title={member.email}
                        >
                          <span className="material-symbols-outlined text-base">
                            alternate_email
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => removeMember(index)}
                      className="p-2 text-slate-600 hover:text-[#ff716c] transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {team.length === 0 && (
              <div className="relative p-12 bg-black/20 rounded-xl border border-dashed border-[#45484f]/30 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-[#45484f] mb-4">
                  group
                </span>
                <p className="text-[#a9abb3] text-sm italic">
                  No team members added yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ActionFooter
        onContinue={() => onStepChange?.('Overview')}
        continueText="Complete Setup"
      />
    </div>
  )
}
