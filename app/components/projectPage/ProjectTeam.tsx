import { Users, Wallet, Copy, CheckCheck } from 'lucide-react'
import { useState } from 'react'
import type { ProjectDetail } from '@/schemas/projectSchema'

type Member = ProjectDetail['projectMembers'][number]

function getInitials(name?: string | null) {
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
      className="group/w inline-flex items-center gap-1.5 text-[#73757d] hover:text-[#a9abb3] transition-colors duration-200"
    >
      <Wallet className="w-3 h-3 shrink-0" />
      <span className="font-mono text-[11px] tracking-wide">
        {truncateWallet(address)}
      </span>
      {copied ? (
        <CheckCheck className="w-3 h-3 text-[#8ff5ff]" />
      ) : (
        <Copy className="w-3 h-3 opacity-0 group-hover/w:opacity-100 transition-opacity duration-200" />
      )}
    </button>
  )
}

function MemberRow({ member, index }: { member: Member; index: number }) {
  const user = member.user
  const name = user?.name || 'Unknown Member'
  const avatar = user?.avatar
  const email = user?.email
  const wallet = user?.walletAddress || member.userId

  return (
    <div className="flex items-center gap-5 py-4 border-b border-[#2e323b]/40 last:border-0 group hover:bg-[#161a21]/50 -mx-4 px-4 rounded-xl transition-colors duration-200">
      {/* Index */}
      <span className="text-[#3a3e4a] font-mono text-[11px] w-5 text-right shrink-0 tabular-nums select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Avatar */}
      <div className="shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover border border-[#2e323b]/60 group-hover:border-[#ac89ff]/30 transition-colors duration-300"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#1c1f28] border border-[#2e323b]/60 group-hover:border-[#ac89ff]/30 flex items-center justify-center transition-colors duration-300">
            <span className="text-[#ac89ff] font-semibold text-xs font-['Space_Grotesk']">
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>

      {/* Name + Role + Email */}
      <div className="flex-1 min-w-0">
        <p className="text-[#ecedf6] font-['Space_Grotesk'] font-semibold text-[14px] leading-snug truncate">
          {name}
        </p>
        <p className="text-[#ac89ff] text-[11px] font-medium uppercase tracking-widest mt-0.5">
          {member.role}
        </p>
        {email && (
          <p className="text-[#73757d] text-[11px] mt-1 truncate">{email}</p>
        )}
      </div>

      {/* Wallet — right, secondary */}
      <div className="shrink-0 hidden sm:block">
        <WalletCell address={wallet} />
      </div>
    </div>
  )
}

export function ProjectTeam({ project }: { project: ProjectDetail }) {
  const members = project.projectMembers ?? []

  return (
    <div className="max-w-2xl">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#73757d] font-['Space_Grotesk']">
          Team
        </span>
        <div className="flex-1 h-px bg-[#2e323b]/40" />
        <span className="text-[11px] font-mono text-[#3a3e4a]">
          {members.length} {members.length === 1 ? 'member' : 'members'}
        </span>
      </div>

      {members.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
          <div className="w-14 h-14 rounded-full bg-[#161a21] border border-[#2e323b]/50 flex items-center justify-center">
            <Users className="w-6 h-6 text-[#3a3e4a]" />
          </div>
          <div>
            <p className="text-[#a9abb3] text-sm font-['Space_Grotesk'] font-medium">
              No team members assigned
            </p>
            <p className="text-[#73757d] text-xs mt-1">
              Team members are added when the project is created.
            </p>
          </div>
        </div>
      ) : (
        /* Roster list */
        <div>
          {members.map((member, i) => (
            <MemberRow key={member.id} member={member} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
