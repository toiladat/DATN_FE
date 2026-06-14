import { Users, Wallet, Copy, CheckCheck, Mail } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import type { ProjectDetail } from '@/schemas/projectSchema'

type Member = ProjectDetail['projectMembers'][number]

type OptionalString = string | null | undefined

function getInitials(name?: OptionalString) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function truncateWallet(wallet: string) {
  if (wallet.length <= 16) return wallet
  return `${wallet.slice(0, 8)}...${wallet.slice(-6)}`
}

function WalletCell({ address }: { address: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(address).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      title={address}
      className="group/w inline-flex items-center gap-1.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200"
    >
      <Wallet className="w-3 h-3 shrink-0" />
      <span className="font-mono text-[11px] tracking-wide">
        {truncateWallet(address)}
      </span>
      {copied ? (
        <CheckCheck className="w-3 h-3 text-neon-cyan" />
      ) : (
        <Copy className="w-3 h-3 opacity-0 group-hover/w:opacity-100 transition-opacity duration-200" />
      )}
    </button>
  )
}

function MemberCard({
  member,
  isOwner = false
}: {
  member: Member
  isOwner?: boolean
}) {
  const { t } = useTranslation()
  const user = member.user
  const name = user?.name || 'Unknown Member'
  const avatar = user?.avatar
  const role = member.role
  const wallet = user?.walletAddress || member.userId
  const email = user?.email
  const description = member.description

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`flex flex-col items-center gap-3 text-center group cursor-pointer focus:outline-none ${isOwner ? 'w-40' : 'w-28'}`}
        >
          <div
            className={`rounded-none bg-gradient-to-br from-neon-cyan to-neon-purple p-[2px] transition-transform duration-300 ease-out group-hover:scale-110 ${isOwner ? 'w-20 h-20' : 'w-16 h-16'}`}
          >
            <div className="w-full h-full rounded-none bg-background overflow-hidden flex items-center justify-center border border-border/20">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              ) : (
                <span className="text-neon-purple font-semibold text-lg font-['Space_Grotesk']">
                  {getInitials(name)}
                </span>
              )}
            </div>
          </div>
          <div>
            <p
              className={`text-foreground font-['Space_Grotesk'] font-bold leading-snug line-clamp-2 group-hover:text-neon-cyan transition-colors ${isOwner ? 'text-[14px]' : 'text-[12px]'}`}
            >
              {name}
            </p>
            <p
              className={`text-neon-cyan font-medium uppercase tracking-widest mt-1 ${isOwner ? 'text-[10px]' : 'text-[9px]'}`}
            >
              {role}
            </p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="center"
        className="bg-card/95 backdrop-blur-md border-border/50 text-foreground w-64 p-4 shadow-2xl"
      >
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex flex-col gap-2 border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <Wallet className="w-3.5 h-3.5 text-muted-foreground/60" />
              <WalletCell address={wallet} />
            </div>
            {email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-muted-foreground/60" />
                <span className="truncate">{email}</span>
              </div>
            )}
          </div>
          {description ? (
            <div className="text-foreground/80 leading-relaxed">
              {description}
            </div>
          ) : (
            <div className="text-muted-foreground/60 italic">
              {t('team.no_description')}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function ProjectTeam({ project }: { project: ProjectDetail }) {
  const { t } = useTranslation()
  const members = project.projectMembers ?? []

  const creator = project.user
  let ownerIndex = members.findIndex((m) => m.userId === project.userId)

  let displayOwner: Member | null = null
  let otherMembers = members

  if (ownerIndex !== -1) {
    displayOwner = { ...members[ownerIndex], role: 'OWNER' }
    otherMembers = members.filter((_, i) => i !== ownerIndex)
  } else if (creator) {
    // Inject creator if not in members
    displayOwner = {
      id: creator.id,
      userId: creator.id,
      role: 'OWNER',
      user: {
        id: creator.id,
        name: creator.name,
        avatar: creator.avatar,
        email: creator.email,
        walletAddress: creator.walletAddress
      }
    }
  } else {
    // Fallback if no creator available (shouldn't happen)
    ownerIndex = members.findIndex(
      (m) =>
        m.role.toLowerCase() === 'owner' ||
        m.role.toLowerCase() === 'founder' ||
        m.role.toLowerCase() === 'chủ dự án'
    )
    if (ownerIndex !== -1) {
      displayOwner = { ...members[ownerIndex], role: 'OWNER' }
      otherMembers = members.filter((_, i) => i !== ownerIndex)
    } else if (members.length > 0) {
      displayOwner = { ...members[0], role: 'OWNER' }
      otherMembers = members.slice(1)
    }
  }

  const isEmpty = !displayOwner && otherMembers.length === 0

  return (
    <div className="max-w-4xl mx-auto">
      {isEmpty ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
          <div className="w-14 h-14 rounded-none bg-background border border-border/50 flex items-center justify-center">
            <Users className="w-6 h-6 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-['Space_Grotesk'] font-medium">
              {t('team.no_members')}
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              {t('team.empty_hint')}
            </p>
          </div>
        </div>
      ) : (
        /* Hierarchy Roster */
        <div className="flex flex-col items-center gap-8">
          {displayOwner && (
            <div className="flex justify-center w-full">
              <MemberCard member={displayOwner} isOwner={true} />
            </div>
          )}

          {otherMembers.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 max-w-3xl">
              {otherMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
