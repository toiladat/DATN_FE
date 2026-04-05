import { Hero } from '@/components/landing/Hero'
import { Partners } from '@/components/landing/Partners'
import { FeaturedProjects } from '@/components/landing/FeaturedProjects'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Features } from '@/components/landing/Features'
import { CtaBanner } from '@/components/landing/CtaBanner'

export default function Home() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden pt-10 transition-colors duration-300">
      <Hero />
      <Partners />
      <FeaturedProjects />
      <HowItWorks />
      <Features />
      <CtaBanner />
    </div>
  )
}
