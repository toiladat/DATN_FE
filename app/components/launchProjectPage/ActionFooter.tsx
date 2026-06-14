import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'

interface ActionFooterProps {
  onDiscard?: () => void
  onContinue?: () => void
  continueText?: string
}

export function ActionFooter({
  onDiscard,
  onContinue,
  continueText
}: ActionFooterProps) {
  const { state, isMobile } = useSidebar()
  const { t } = useTranslation()
  const isCollapsed = state === 'collapsed'

  const leftOffset = isMobile
    ? '0px'
    : isCollapsed
      ? 'var(--sidebar-width-icon)'
      : 'var(--sidebar-width)'

  const displayContinueText = continueText || t('btn.continue')

  return (
    <div
      className="fixed bottom-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border/50 py-3 px-6 flex justify-between items-center z-40 transition-all duration-200"
      style={{ left: leftOffset }}
    >
      {/* Destructive action — baixo visual weight deliberate */}
      <button
        onClick={onDiscard}
        className="text-muted-foreground/45 hover:text-muted-foreground transition-colors text-sm font-['Space_Grotesk']"
      >
        {t('btn.discard_changes')}
      </button>

      <Button
        onClick={onContinue}
        className="bg-neon-cyan hover:bg-neon-cyan/95 text-background px-8 py-2 h-10 rounded-none font-headline font-bold text-sm shadow-[2px_2px_0px_0px_var(--neon-purple)] hover:shadow-[3px_3px_0px_0px_var(--neon-purple)] transition-all active:translate-y-0.5 active:translate-x-0.5 border border-neon-cyan cursor-pointer"
      >
        {displayContinueText}
      </Button>
    </div>
  )
}
