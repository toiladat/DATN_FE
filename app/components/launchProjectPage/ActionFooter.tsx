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
      className="fixed bottom-0 right-0 bg-[#0b0e14]/90 backdrop-blur-xl border-t border-[#2e323b]/50 py-3 px-6 flex justify-between items-center z-40 transition-all duration-200"
      style={{ left: leftOffset }}
    >
      {/* Destructive action — baixo visual weight deliberate */}
      <button
        onClick={onDiscard}
        className="text-[#45484f] hover:text-[#a9abb3] transition-colors text-sm font-['Space_Grotesk']"
      >
        Discard changes
      </button>

      <Button
        onClick={onContinue}
        className="bg-[#8ff5ff] hover:bg-[#a8f8ff] text-[#00383d] px-8 py-2 h-10 rounded-xl font-['Space_Grotesk'] font-bold text-sm shadow-[0_0_20px_rgba(143,245,255,0.25)] hover:shadow-[0_0_28px_rgba(143,245,255,0.4)] transition-all active:scale-95 border-none"
      >
        {continueText}
      </Button>
    </div>
  )
}
