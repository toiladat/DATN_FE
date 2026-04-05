import { Check } from 'lucide-react'
import { PROJECT_DETAIL_DATA } from '../../data/projectData'

export function RewardTiers() {
  const { tiers } = PROJECT_DETAIL_DATA

  return (
    <aside className="lg:col-span-4 space-y-6">
      <h2 className="text-xl font-headline font-bold uppercase tracking-widest text-muted-foreground mb-4">
        Support the Mission
      </h2>
      {tiers.map((tier) => {
        const themeColor =
          tier.theme === 'secondary' ? 'text-secondary' : 'text-primary'
        const themeBorder =
          tier.theme === 'secondary' ? 'border-secondary/30' : 'border-border'
        const themeHover =
          tier.theme === 'secondary'
            ? 'hover:border-secondary/50'
            : 'hover:border-primary/50'
        const bgBtn =
          tier.theme === 'secondary'
            ? 'bg-secondary text-secondary-foreground neon-glow-secondary'
            : 'bg-foreground/10 group-hover:bg-primary group-hover:text-primary-foreground'

        return (
          <div
            key={tier.id}
            className={`group p-6 rounded-xl bg-surface-container-low border ${themeBorder} ${themeHover} relative overflow-hidden transition-all cursor-pointer`}
          >
            {tier.isPopular && (
              <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-3 py-1 rounded-bl-lg text-[10px] font-black uppercase">
                Most Popular
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3
                  className={`font-headline font-bold text-xl ${tier.isPopular ? themeColor : 'text-foreground group-hover:text-primary'} transition-colors`}
                >
                  {tier.title}
                </h3>
                <p className={`${themeColor} font-bold`}>{tier.priceETH} ETH</p>
              </div>
              <span className="text-xs bg-surface-variant px-2 py-1 rounded text-muted-foreground uppercase font-bold">
                {tier.limit} Left
              </span>
            </div>

            {tier.description && (
              <p className="text-xs text-muted-foreground mb-4 italic">
                {tier.description}
              </p>
            )}

            {tier.perks.length > 0 && (
              <ul className="space-y-3 mb-6 text-sm text-muted-foreground">
                {tier.perks.map((perk, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <Check
                      className={`w-3 h-3 ${themeColor}`}
                      strokeWidth={4}
                    />{' '}
                    {perk}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-1 mb-6 text-xs text-muted-foreground">
              <span>ESTIMATED DELIVERY</span>
              <span className="text-foreground font-bold">{tier.delivery}</span>
            </div>

            <button
              className={`w-full py-3 rounded-lg border border-border transition-all font-bold ${bgBtn}`}
            >
              Select Reward
            </button>
          </div>
        )
      })}
    </aside>
  )
}
