import { Globe, Shield, Activity } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-background w-full py-16 px-4 border-t border-border/40 mt-auto z-10 relative overflow-hidden">
      {/* Background dot grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAyIiBoZWlnaHQ9IjYwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMTUpIi8+PC9zdmc+')] opacity-20 pointer-events-none z-0" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto relative z-10">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-1 mb-4">
            <img
              src="/logo.png"
              alt="FundHive Logo"
              className="h-14 w-14 object-contain my-[-8px] ml-[-10px] mr-[-8px]"
            />
            <span className="text-xl font-bold text-neon-cyan font-headline tracking-tighter drop-shadow-[0_0_8px_rgba(143,245,255,0.3)]">
              FundHive
            </span>
          </div>
          <p className="font-['Inter'] text-sm text-muted-foreground leading-relaxed">
            {t('footer.desc')}
          </p>
        </div>

        <div>
          <h6 className="font-headline font-bold text-foreground mb-6 uppercase tracking-wider text-xs">
            {t('footer.ecosystem')}
          </h6>
          <ul className="space-y-4">
            <li>
              <Link
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                to="/projects"
              >
                {t('nav.projects')}
              </Link>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                href="#"
              >
                Yield Pools
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                href="#"
              >
                Governance
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                href="#"
              >
                Documentation
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-headline font-bold text-foreground mb-6 uppercase tracking-wider text-xs">
            {t('footer.community')}
          </h6>
          <ul className="space-y-4">
            <li>
              <a
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                href="#"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                href="#"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                href="#"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                href="#"
              >
                Newsletter Signup
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-headline font-bold text-foreground mb-6 uppercase tracking-wider text-xs">
            {t('footer.legal')}
          </h6>
          <ul className="space-y-4">
            <li>
              <a
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <Link
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                to="/how-it-works"
              >
                {t('nav.how_it_works')}
              </Link>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
                href="#"
              >
                Security Audits
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground/80">
          © {new Date().getFullYear()} VaultPrime. {t('footer.rights')}
        </p>
        <div className="flex gap-6">
          <Globe className="text-muted-foreground hover:text-neon-cyan cursor-pointer transition-colors w-4 h-4" />
          <Shield className="text-muted-foreground hover:text-neon-cyan cursor-pointer transition-colors w-4 h-4" />
          <Activity className="text-muted-foreground hover:text-neon-cyan cursor-pointer transition-colors w-4 h-4" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
