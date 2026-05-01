import { Globe, Shield, Activity } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-background w-full py-16 px-4 border-t border-border mt-auto z-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-1">
          <span className="text-xl font-bold text-cyan-400 mb-4 block font-headline">
            RadiantVoid
          </span>
          <p className="font-['Inter'] text-sm text-slate-400 leading-relaxed">
            A decentralized launchpad empowering the next generation of
            blockchain projects with transparency and community governance.
          </p>
        </div>

        <div>
          <h6 className="font-headline font-bold text-foreground mb-6 uppercase tracking-wider text-xs">
            Ecosystem
          </h6>
          <ul className="space-y-4">
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Yield Pools
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Governance
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Documentation
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-headline font-bold text-foreground mb-6 uppercase tracking-wider text-xs">
            Community
          </h6>
          <ul className="space-y-4">
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Newsletter Signup
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-headline font-bold text-foreground mb-6 uppercase tracking-wider text-xs">
            Legal & Info
          </h6>
          <ul className="space-y-4">
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                className="font-['Inter'] text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                href="#"
              >
                Security Audits
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-['Inter'] text-sm text-slate-400">
          © {new Date().getFullYear()} VaultPrime. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Globe className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors w-5 h-5" />
          <Shield className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors w-5 h-5" />
          <Activity className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors w-5 h-5" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
