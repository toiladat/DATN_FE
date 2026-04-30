import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import {
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  User,
  FolderKanban,
  LogOut,
  ChevronDown,
  Wallet,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useBalance, useAccount } from 'wagmi'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAuth } from '@/components/providers/AuthProvider'

const MUSDT_ADDRESS = import.meta.env.VITE_MUSDT_ADDRESS as
  | `0x${string}`
  | undefined

// ─── Unified Wallet + Profile Button ─────────────────────────────────────────
function WalletProfileButton() {
  const { setTheme, theme } = useTheme()
  const { logout, isAuthenticated } = useAuth()
  const { address } = useAccount()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // mUSDT balance
  const { data: musdtData } = useBalance({
    address,
    token: MUSDT_ADDRESS,
    query: { enabled: !!address && !!MUSDT_ADDRESS, refetchInterval: 30_000 }
  })
  const musdtBalance = musdtData
    ? `${parseFloat(musdtData.formatted).toLocaleString(undefined, { maximumFractionDigits: 2 })} mUSDT`
    : null

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const themeOptions = [
    {
      label: 'Light',
      value: 'light' as const,
      icon: <Sun className="w-3.5 h-3.5" />
    },
    {
      label: 'Dark',
      value: 'dark' as const,
      icon: <Moon className="w-3.5 h-3.5" />
    },
    {
      label: 'System',
      value: 'system' as const,
      icon: <Monitor className="w-3.5 h-3.5" />
    }
  ]

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openChainModal, mounted }) => {
        if (!mounted) return null

        // ── Not connected ──
        if (!account) {
          return (
            <button
              onClick={openConnectModal}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl text-[11px] font-bold uppercase tracking-widest border border-[#8ff5ff]/30 bg-[#8ff5ff]/5 text-[#8ff5ff] hover:bg-[#8ff5ff]/10 hover:border-[#8ff5ff]/60 hover:shadow-[0_0_12px_rgba(143,245,255,0.15)] transition-all duration-200"
            >
              <Wallet className="w-3.5 h-3.5" />
              Connect Wallet
            </button>
          )
        }

        // ── Wrong network ──
        if (chain?.unsupported) {
          return (
            <button
              onClick={openChainModal}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl text-[11px] font-bold uppercase tracking-widest border border-[#ff716c]/30 bg-[#ff716c]/5 text-[#ff716c] hover:bg-[#ff716c]/10 transition-all"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Wrong Network
            </button>
          )
        }

        // ── Connected — single dropdown trigger ──
        return (
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 h-9 px-3 rounded-xl border border-[#2e323b] bg-[#10131a] hover:border-[#8ff5ff]/30 hover:bg-[#0d1018] transition-all group"
            >
              {/* Chain icon */}
              {chain?.hasIcon && chain.iconUrl ? (
                <img
                  src={chain.iconUrl}
                  alt={chain.name ?? ''}
                  className="w-4 h-4 rounded-full"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <User className="w-3 h-3 text-primary" />
                </div>
              )}
              {/* Address */}
              <span className="text-[11px] font-mono text-[#a9abb3] group-hover:text-[#ecedf6] transition-colors">
                {account.displayName}
              </span>
              {/* mUSDT balance only */}
              {musdtBalance && (
                <span className="text-[10px] font-mono text-[#8ff5ff]/80 border-l border-[#2e323b] pl-2">
                  {musdtBalance}
                </span>
              )}
              <ChevronDown
                className={`w-3 h-3 text-[#545760] transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-11 w-60 rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden py-1">
                {/* Wallet info */}
                <div className="px-4 py-3 border-b border-border/40">
                  <div className="flex items-center gap-2 mb-1.5">
                    {chain?.hasIcon && chain.iconUrl && (
                      <img
                        src={chain.iconUrl}
                        alt={chain.name ?? ''}
                        className="w-3.5 h-3.5 rounded-full"
                      />
                    )}
                    <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                      {chain?.name ?? 'Wallet'}
                    </span>
                  </div>
                  {/* Short address + copy */}
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12px] font-mono text-foreground">
                      {account.address
                        ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                        : account.displayName}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(account.address ?? '')
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      title="Copy address"
                      className="flex items-center justify-center w-6 h-6 rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-surface-variant transition-colors"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-[#6bcb77]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Nav links */}
                {isAuthenticated && (
                  <div className="py-1 border-b border-border/40">
                    <button
                      onClick={() => {
                        navigate('/my-project')
                        setOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-surface-variant transition-colors"
                    >
                      <FolderKanban className="w-4 h-4" />
                      My Projects
                    </button>
                    <button
                      onClick={() => {
                        navigate('/profile')
                        setOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-surface-variant transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                  </div>
                )}

                {/* Theme */}
                <div className="px-4 pt-2.5 pb-2">
                  <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-1.5">
                    Appearance
                  </p>
                  <div className="flex gap-1">
                    {themeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setTheme(opt.value)}
                        title={opt.label}
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] transition-all ${
                          theme === opt.value
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'text-muted-foreground hover:bg-surface-variant hover:text-foreground border border-transparent'
                        }`}
                      >
                        {opt.icon}
                        <span className="hidden sm:block">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Disconnect */}
                <div className="py-1 border-t border-border/40">
                  <button
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

// ─── Main Header ──────────────────────────────────────────────────────────────
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Launch Your Idea', path: '/launch-project' },
    { name: 'My Projects', path: '/my-project' }
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_20px_rgba(var(--primary),0.05)] flex items-center justify-between px-4 md:px-8 h-20 transition-colors duration-300">
      {/* Logo */}
      <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
        <div className="text-2xl font-bold tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)] font-headline">
          VAULT_PRIME
        </div>
      </NavLink>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8 font-headline tracking-tight">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `transition-colors font-bold ${
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Desktop actions — single unified button */}
      <div className="hidden md:flex items-center gap-3">
        <WalletProfileButton />
      </div>

      {/* Mobile actions */}
      <div className="flex md:hidden items-center gap-2">
        <WalletProfileButton />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:bg-surface-variant transition-colors"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-background/95 backdrop-blur-xl z-40 md:hidden border-t border-border/50">
          <nav className="container mx-auto px-4 py-8">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 px-6 rounded-xl font-headline font-bold text-lg border border-transparent transition-all ${
                        isActive
                          ? 'bg-primary/10 text-primary border-primary/20'
                          : 'text-muted-foreground hover:bg-surface-variant hover:text-foreground'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
