import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'

interface ActionFooterProps {
  onDiscard?: () => void
  onContinue?: () => void
  continueText?: string
}

export function ActionFooter({
  onDiscard,
  onContinue,
  continueText = 'Continue'
}: ActionFooterProps) {
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  const leftOffset = isMobile
    ? '0px'
    : isCollapsed
      ? 'var(--sidebar-width-icon)'
      : 'var(--sidebar-width)'

  return (
    <div
      className="fixed bottom-0 right-0 bg-[#0b0e14]/80 backdrop-blur-xl border-t border-[#45484f]/20 py-3 px-6 flex justify-between items-center z-40 transition-all duration-200"
      style={{ left: leftOffset }}
    >
      <button
        onClick={onDiscard}
        className="flex items-center gap-2 text-[#a9abb3] hover:text-[#ecedf6] transition-colors font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs"
      >
        <span className="material-symbols-outlined text-sm">chevron_left</span>
        Discard Changes
      </button>
      <div className="flex gap-4">
        <Button
          onClick={onContinue}
          className="bg-[#8ff5ff] hover:bg-[#00eefc] text-[#005d63] px-8 py-2 h-10 rounded-full font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(143,245,255,0.4)] hover:shadow-[0_0_20px_rgba(143,245,255,0.6)] transition-all active:scale-95 border-none"
        >
          {continueText}
        </Button>
      </div>
    </div>
  )
}
