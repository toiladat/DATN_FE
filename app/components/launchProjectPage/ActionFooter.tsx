import { Button } from '@/components/ui/button'

interface ActionFooterProps {
  onDiscard?: () => void
  onSaveDraft?: () => void
  onContinue?: () => void
  continueText?: string
}

export function ActionFooter({
  onDiscard,
  onSaveDraft,
  onContinue,
  continueText = 'Continue'
}: ActionFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 md:left-[16rem] lg:left-[16rem] right-0 bg-[#0b0e14]/80 backdrop-blur-xl border-t border-[#45484f]/20 py-4 px-8 flex justify-between items-center z-40">
      <button
        onClick={onDiscard}
        className="flex items-center gap-2 text-[#a9abb3] hover:text-[#ecedf6] transition-colors font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs"
      >
        <span className="material-symbols-outlined text-sm">chevron_left</span>
        Discard Changes
      </button>
      <div className="flex gap-4">
        <Button
          onClick={onSaveDraft}
          variant="outline"
          className="px-8 py-3 h-12 rounded-full font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs border-[#45484f]/30 hover:bg-[#22262f] bg-transparent text-[#ecedf6] transition-colors"
        >
          Save Draft
        </Button>
        <Button
          onClick={onContinue}
          className="bg-[#8ff5ff] hover:bg-[#00eefc] text-[#005d63] px-10 py-3 h-12 rounded-full font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(143,245,255,0.4)] hover:shadow-[0_0_30px_rgba(143,245,255,0.6)] transition-all active:scale-95 border-none"
        >
          {continueText}
        </Button>
      </div>
    </div>
  )
}
