import { useParams, Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { ProjectHero } from '@/components/projectPage/ProjectHero'
import { ProjectMedia } from '@/components/projectPage/ProjectMedia'
import { ProjectStats } from '@/components/projectPage/ProjectStats'
import { CreatorProfile } from '@/components/projectPage/CreatorProfile'
import { ProjectTabs } from '@/components/projectPage/ProjectTabs'
import { ProjectContent } from '@/components/projectPage/ProjectContent'
import { RewardTiers } from '@/components/projectPage/RewardTiers'

// Note: Re-enable these hooks when you want to connect the mock UI back to the smart contracts
/*
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useGetCampaignById } from '@/apis/queries/campaign'
import { useGetCampaignContract, useGetContributionFee } from '@/apis/queries/contract'
import { ContributeDialog } from '@/components/campaignDetail/ContributeDialog'
*/

export default function CampaignDetail() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="bg-background text-foreground transition-colors duration-300 min-h-screen">
      <main className="pt-10 pb-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Navigation Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors font-bold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Discover
        </Link>

        {/* 1. Hero Header */}
        <ProjectHero />

        {/* 2. Media & Quick Stats */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <ProjectMedia />
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ProjectStats />
            <CreatorProfile />
          </div>
        </section>

        {/* 3. Navigation Tabs */}
        <ProjectTabs />

        {/* 4. Main Content (Story + Tiers) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <ProjectContent />
          <RewardTiers />
        </div>
      </main>
    </div>
  )
}
