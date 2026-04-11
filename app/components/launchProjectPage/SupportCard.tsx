import { Card, CardContent } from '@/components/ui/card'

interface SupportCardProps {
  icon: string
  title: string
  description: string
}

export function SupportCard({ icon, title, description }: SupportCardProps) {
  return (
    <Card className="bg-[#10131a] border-[#45484f]/10 hover:border-[#8ff5ff]/30 transition-all cursor-pointer group rounded-xl">
      <CardContent className="p-6">
        <span className="material-symbols-outlined text-[#7d98ff] mb-4 block">
          {icon}
        </span>
        <h4 className="font-semibold text-[#ecedf6] group-hover:text-[#8ff5ff] transition-colors">
          {title}
        </h4>
        <p className="text-sm text-[#a9abb3] mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}
