import { Card, CardContent } from '@/components/ui/card'

interface SupportCardProps {
  icon: string
  title: string
  description: string
}

export function SupportCard({ icon, title, description }: SupportCardProps) {
  return (
    <Card className="bg-card border-border/50 hover:border-neon-cyan/30 transition-all cursor-pointer group rounded-none">
      <CardContent className="p-6">
        <span className="material-symbols-outlined text-neon-purple mb-4 block">
          {icon}
        </span>
        <h4 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}
