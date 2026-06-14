import { useState, useEffect } from 'react'
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
import { useSearchUsers } from '@/apis/queries/user'
import { useDebounce } from '@/hooks/useDebounce'
import type { UserSearchProfile } from '@/schemas/userSchema'
import { useTranslation } from 'react-i18next'

interface TeamStepProps {
  onStepChange?: (step: string) => void
}

export function TeamStep({ onStepChange }: TeamStepProps = {}) {
  const { t } = useTranslation()
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
  const debouncedSearchQuery = useDebounce(searchQuery, 400) // Debounce 400ms

  const { data: searchResults = [], isLoading: isSearching } =
    useSearchUsers(debouncedSearchQuery)

  const showDropdown = !!searchQuery && searchQuery.length >= 2

  useEffect(() => {
    if (!searchQuery.trim()) {
      // Logic handled by hook
    }
  }, [searchQuery])

  const selectUser = (user: UserSearchProfile) => {
    setNewMember({
      ...newMember,
      id: user.id,
      name: user.name || 'unknown',
      email: user.email || '',
      wallet: user.walletAddress || '',
      avatar: user.avatar || ''
    })
    setSearchQuery('')
  }

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.wallet) {
      toast.error(t('validation.missing_information'), {
        description: t('toast.select_member_desc')
      })
      return
    }

    if (!newMember.roleDescription.trim()) {
      toast.error(t('validation.missing_role_description'), {
        description: t('toast.role_desc_required')
      })
      return
    }

    const isDuplicate = team.some(
      (member) =>
        member.email === newMember.email || member.wallet === newMember.wallet
    )
    if (isDuplicate) {
      toast.error(t('validation.member_already_added'), {
        description: t('toast.member_exists_desc')
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
    toast.success(t('validation.member_added'), {
      description: t('toast.member_added_success', { name: newMember.name })
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
        <h1 className="text-5xl font-['Space_Grotesk'] font-bold tracking-tight text-foreground mb-4">
          {t('team.title')}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {t('team.desc')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Section */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-card/40 backdrop-blur-xl border border-neon-cyan/10 pt-8 pb-4 rounded-none relative overflow-hidden shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 blur-3xl -mr-16 -mt-16 rounded-none"></div>

            <CardContent>
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-neon-cyan mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">person_add</span>
                {t('team.contributorDetails')}
              </h2>

              <form className="space-y-5">
                {/* Platform Member Search */}
                <div
                  className={`relative group transition-all ${isFounder ? 'opacity-30 pointer-events-none' : ''}`}
                >
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-neon-cyan/70 mb-2">
                    {t('team.searchLabel')}
                  </Label>
                  <div className="relative focus-within:text-neon-cyan">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg transition-colors">
                      search
                    </span>
                    <Input
                      className="w-full bg-background border border-border rounded-none text-foreground focus-visible:ring-1 focus-visible:ring-neon-cyan/50 placeholder:text-muted-foreground/50 transition-all h-12 pl-10 pr-4"
                      placeholder={t('team.searchPlaceholder')}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {showDropdown && (
                    <div className="absolute z-20 w-full mt-1 bg-card border border-neon-cyan/20 rounded-none overflow-hidden shadow-[2px_2px_0px_var(--neon-purple)]">
                      {isSearching ? (
                        <div className="p-4 text-center text-xs text-muted-foreground">
                          {t('team.searching')}
                        </div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((user, i) => (
                          <div
                            key={i}
                            onMouseDown={() => selectUser(user)}
                            className="p-3 hover:bg-neon-cyan/10 cursor-pointer flex items-center gap-3 border-b border-border"
                          >
                            <div className="w-8 h-8 rounded bg-neon-cyan/20 flex items-center justify-center text-neon-cyan font-bold text-xs uppercase">
                              {(
                                user.name ||
                                user.email ||
                                user.walletAddress
                              ).substring(0, 2)}
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-foreground">
                                {user.name ||
                                  user.email?.split('@')[0] ||
                                  `${user.walletAddress.substring(0, 6)}...${user.walletAddress.slice(-4)}`}
                              </div>
                              <div className="text-[10px] text-muted-foreground">
                                {user.email || t('team.noEmail')}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-muted-foreground">
                          {t('team.noUserFound')}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-2 h-[1px] bg-gradient-to-r from-neon-cyan/30 to-transparent"></div>
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-muted-foreground mb-2">
                    {t('team.fullName')}
                  </Label>
                  <Input
                    className="w-full bg-muted border border-border rounded-none text-muted-foreground h-12 px-4 shadow-none opacity-60 cursor-not-allowed focus-visible:ring-0"
                    placeholder={t('team.populatePlaceholder')}
                    type="text"
                    readOnly
                    value={newMember.name}
                  />
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-muted-foreground mb-2">
                    {t('team.emailAddress')}
                  </Label>
                  <Input
                    className="w-full bg-muted border border-border rounded-none text-muted-foreground h-12 px-4 shadow-none opacity-60 cursor-not-allowed focus-visible:ring-0"
                    placeholder={t('team.populatePlaceholder')}
                    type="email"
                    readOnly
                    value={newMember.email}
                  />
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-muted-foreground mb-2">
                    {t('team.walletAddress')}
                  </Label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neon-cyan/60 text-lg">
                      account_balance_wallet
                    </span>
                    <Input
                      className="w-full bg-muted border border-border rounded-none text-muted-foreground h-12 pl-10 pr-4 shadow-none opacity-60 cursor-not-allowed focus-visible:ring-0"
                      placeholder={t('team.populatePlaceholder')}
                      type="text"
                      readOnly
                      value={newMember.wallet}
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-muted-foreground mb-2">
                    {t('team.role')}
                  </Label>
                  <Select
                    value={newMember.role}
                    onValueChange={(v) =>
                      setNewMember({ ...newMember, role: v })
                    }
                  >
                    <SelectTrigger className="w-full bg-background border border-border rounded-none text-foreground focus:ring-1 focus:ring-neon-cyan/50 transition-all h-12 px-4 shadow-none">
                      <SelectValue placeholder={t('team.selectRole')} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border text-foreground rounded-none">
                      <SelectItem value="Founder">
                        {t('team.role.founder')}
                      </SelectItem>
                      <SelectItem value="Lead Developer">
                        {t('team.role.leaddeveloper')}
                      </SelectItem>
                      <SelectItem value="Designer">
                        {t('team.role.designer')}
                      </SelectItem>
                      <SelectItem value="Marketing">
                        {t('team.role.marketing')}
                      </SelectItem>
                      <SelectItem value="Advisor">
                        {t('team.role.advisor')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-xs font-['Inter'] uppercase tracking-widest text-muted-foreground mb-2">
                    {t('team.roleDesc')}
                  </Label>
                  <Textarea
                    className="w-full bg-background border border-border rounded-none text-foreground focus-visible:ring-1 focus-visible:ring-neon-cyan/50 placeholder:text-muted-foreground/50 transition-all py-3 px-4 resize-none shadow-none"
                    placeholder={t('team.roleDescPlaceholder')}
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
                  className="w-full h-12 bg-neon-cyan hover:bg-neon-cyan/80 text-background font-['Space_Grotesk'] font-bold rounded-none shadow-[2px_2px_0px_0px_var(--neon-purple)] transition-all text-sm mt-4 border border-neon-cyan cursor-pointer"
                  type="button"
                  onClick={handleAddMember}
                >
                  <span className="material-symbols-outlined mr-2">
                    group_add
                  </span>
                  {t('team.addMember')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* List Section */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-foreground">
              {t('team.activeRoster')}{' '}
              <span className="text-sm text-muted-foreground font-normal ml-2">
                {t('team.membersCount', { count: team.length })}
              </span>
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-border/30 to-transparent ml-6"></div>
          </div>

          <div className="space-y-4">
            {team.map((member, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-none blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center gap-6 p-4 bg-card rounded-none border border-border">
                  <div className="w-14 h-14 rounded-none overflow-hidden flex-shrink-0 border border-neon-cyan/20 flex items-center justify-center bg-background">
                    {member.avatar ? (
                      <img
                        alt="Member Avatar"
                        className="w-full h-full object-cover"
                        src={member.avatar}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-neon-cyan text-3xl">
                        person
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-['Space_Grotesk'] font-bold text-lg text-foreground">
                        {member.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-none bg-neon-cyan/10 border border-neon-cyan/20 text-[9px] uppercase font-bold text-neon-cyan tracking-widest">
                        {t(
                          `team.role.${member.role.replace(/\s+/g, '').toLowerCase()}`,
                          member.role
                        )}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
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
                          className="text-muted-foreground hover:text-neon-purple transition-colors"
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
                      className="p-2 text-muted-foreground hover:text-neon-rose transition-colors"
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
              <div className="relative p-12 bg-muted/10 rounded-none border border-dashed border-border flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-muted-foreground/60 mb-4">
                  group
                </span>
                <p className="text-muted-foreground text-sm italic">
                  {t('team.empty')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ActionFooter
        onContinue={() => onStepChange?.('Attachments')}
        continueText={t('team.continueToAttachments')}
      />
    </div>
  )
}
