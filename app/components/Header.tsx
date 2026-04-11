import { ModeToggle } from '@/components/ModeToggle'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router'
import { Button } from '@/components/ui/button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' }, // Pointing to projects page
    { name: 'Launch Your Idea', path: '/launch-project' },
    { name: 'My Campaigns', path: '/my-campaigns' }
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_20px_rgba(var(--primary),0.05)] flex items-center justify-between px-4 md:px-8 h-20 transition-colors duration-300">
      {/* Logo */}
      <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
        <div className="text-2xl font-bold tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)] font-headline">
          VAULT_PRIME
        </div>
      </NavLink>

      {/* Desktop Navigation */}
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

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">
        <ModeToggle />
        <div className="neon-glow-secondary rounded-xl">
          <ConnectButton showBalance label="Connect Wallet" />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden items-center gap-3">
        <ModeToggle />
        <ConnectButton showBalance={false} label="Connect" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          className="text-foreground"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
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
