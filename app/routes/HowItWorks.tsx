import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  ShieldCheck,
  Activity,
  RotateCcw,
  Sparkles,
  Workflow,
  FileText,
  CheckCircle,
  ArrowRight,
  Lock,
  Globe,
  Coins,
  ChevronRight,
  Rocket,
  Users,
  Paperclip,
  Info
} from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'

type TabType = 'creation' | 'fundraising' | 'execution' | 'payout'

export default function HowItWorksPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>('creation')

  // 1. Creation Steps (Non-technical tone)
  const creationSteps = [
    {
      step: '01',
      title: t('how.phase1.step1.title'),
      desc: t('how.phase1.step1.desc')
    },
    {
      step: '02',
      title: t('how.phase1.step2.title'),
      desc: t('how.phase1.step2.desc')
    },
    {
      step: '03',
      title: t('how.phase1.step3.title'),
      desc: t('how.phase1.step3.desc')
    },
    {
      step: '04',
      title: t('how.phase1.step4.title'),
      desc: t('how.phase1.step4.desc')
    },
    {
      step: '05',
      title: t('how.phase1.step5.title'),
      desc: t('how.phase1.step5.desc')
    }
  ]

  // 2. Execution Steps (Non-technical tone)
  const executionSteps = [
    {
      step: '01',
      title: t('how.phase3.step1.title'),
      desc: t('how.phase3.step1.desc')
    },
    {
      step: '02',
      title: t('how.phase3.step2.title'),
      desc: t('how.phase3.step2.desc')
    },
    {
      step: '03',
      title: t('how.phase3.step3.title'),
      desc: t('how.phase3.step3.desc')
    }
  ]

  return (
    <div className="bg-[#0a0c10] text-[#ecedf6] min-h-screen relative overflow-hidden font-['Space_Grotesk']">
      {/* Background glow graphics */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8ff5ff]/3 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ac89ff]/3 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />

      {/* Main Content */}
      <main className="pt-32 pb-24 px-4 md:px-8 lg:px-12 xl:px-24 max-w-[1200px] mx-auto w-full relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8ff5ff]/20 bg-[#8ff5ff]/5 text-[#8ff5ff] text-xs font-mono mb-6 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8ff5ff] animate-pulse" />
            {t('how.badge.guide')}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ff5ff] via-[#ac89ff] to-[#62e086]">
              {t('how.title')}
            </span>
          </h1>
          <p className="text-[#a9abb3] text-sm md:text-base font-light leading-relaxed">
            {t('how.subtitle')}
          </p>
        </motion.div>

        {/* Dynamic Horizontal Linear Stepper (Extremely clean, no cluttered icons) */}
        <div className="w-full mb-16 bg-[#10131a]/60 border border-[#2e323b]/50 rounded-2xl p-2 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              {
                id: 'creation',
                label: t('how.step.1'),
                glow: 'shadow-[0_0_15px_rgba(143,245,255,0.15)] text-[#8ff5ff]'
              },
              {
                id: 'fundraising',
                label: t('how.step.2'),
                glow: 'shadow-[0_0_15px_rgba(172,137,255,0.15)] text-[#ac89ff]'
              },
              {
                id: 'execution',
                label: t('how.step.3'),
                glow: 'shadow-[0_0_15px_rgba(98,224,134,0.15)] text-[#62e086]'
              },
              {
                id: 'payout',
                label: t('how.step.4'),
                glow: 'shadow-[0_0_15px_rgba(255,113,108,0.15)] text-[#ff716c]'
              }
            ].map((tab, idx) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center justify-between gap-3 px-5 py-4 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? `bg-[#161a21]/90 border-current ${tab.glow} font-bold z-10`
                      : 'bg-transparent text-[#a9abb3] border-transparent hover:text-white hover:bg-[#161a21]/30'
                  }`}
                >
                  <span>{tab.label}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-[#2e323b] hidden lg:block ${idx === 3 ? 'lg:hidden' : ''}`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Stateful Dynamic Step Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[400px]"
        >
          {/* STEP 1: CREATION */}
          {activeTab === 'creation' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#10131a]/80 border border-[#2e323b]/60 rounded-3xl p-8 backdrop-blur-md h-fit">
                  <h2 className="text-xl md:text-2xl font-bold mb-3 text-[#ecedf6]">
                    {t('how.phase1.title')}
                  </h2>
                  <p className="text-[#a9abb3] leading-relaxed font-light text-sm mb-6">
                    {t('how.phase1.subtitle')}
                  </p>

                  {/* Setup Rules & Controls (Simple language) */}
                  <div className="space-y-5 pt-6 border-t border-[#2e323b]/40">
                    <h4 className="text-[10px] font-mono text-[#8ff5ff] uppercase tracking-widest font-bold">
                      {t('how.phase1.rule_header')}
                    </h4>

                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-[#62e086] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-bold text-[#ecedf6] block">
                          {t('how.phase1.rule1.title')}
                        </span>
                        <span className="text-xs text-[#a9abb3] font-light mt-1 block leading-relaxed">
                          {t('how.phase1.rule1.desc')}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-[#62e086] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-bold text-[#ecedf6] block">
                          {t('how.phase1.rule2.title')}
                        </span>
                        <span className="text-xs text-[#a9abb3] font-light mt-1 block leading-relaxed">
                          {t('how.phase1.rule2.desc')}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-[#62e086] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-bold text-[#ecedf6] block">
                          {t('how.phase1.rule3.title')}
                        </span>
                        <span className="text-xs text-[#a9abb3] font-light mt-1 block leading-relaxed">
                          {t('how.phase1.rule3.desc')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Timeline */}
              <div className="lg:col-span-7 space-y-6">
                {creationSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-6 p-6 rounded-2xl border border-[#2e323b]/60 bg-[#161a21]/80 hover:border-[#8ff5ff]/30 transition-all duration-300 group hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-full border border-[#2e323b] bg-[#10131a] flex items-center justify-center text-[#ecedf6] font-mono font-bold text-sm group-hover:text-[#8ff5ff] group-hover:border-[#8ff5ff]/30 transition-colors">
                        {step.step}
                      </div>
                      {idx !== creationSteps.length - 1 && (
                        <div className="w-[1px] h-full bg-[#2e323b] mt-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-bold mb-2 text-[#ecedf6] group-hover:text-white transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#a9abb3] leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: FUNDRAISING */}
          {activeTab === 'fundraising' && (
            <div className="space-y-12">
              <div className="bg-[#10131a]/80 border border-[#2e323b]/60 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-md">
                <div className="max-w-3xl">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#ecedf6]">
                    {t('how.phase2.title')}
                  </h2>
                  <p className="text-[#a9abb3] leading-relaxed font-light mb-6 text-sm">
                    {t('how.phase2.desc')}
                  </p>
                </div>
              </div>

              {/* Grid block rules (Clean layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#161a21]/90 border border-[#2e323b]/60 rounded-2xl p-8 hover:border-[#ac89ff]/30 transition-all duration-300 group hover:-translate-y-1">
                  <h3 className="text-lg font-bold mb-3 text-[#ecedf6] group-hover:text-[#ac89ff] transition-colors">
                    {t('how.phase2.rule1.title')}
                  </h3>
                  <p className="text-xs text-[#a9abb3] leading-relaxed font-light">
                    {t('how.phase2.rule1.desc')}
                  </p>
                </div>

                <div className="bg-[#161a21]/90 border border-[#2e323b]/60 rounded-2xl p-8 hover:border-[#ac89ff]/30 transition-all duration-300 group hover:-translate-y-1">
                  <h3 className="text-lg font-bold mb-3 text-[#ecedf6] group-hover:text-[#ac89ff] transition-colors">
                    {t('how.phase2.rule2.title')}
                  </h3>
                  <p className="text-xs text-[#a9abb3] leading-relaxed font-light">
                    {t('how.phase2.rule2.desc')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EXECUTION */}
          {activeTab === 'execution' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#10131a]/80 border border-[#2e323b]/60 rounded-3xl p-8 backdrop-blur-md h-fit">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#ecedf6]">
                    {t('how.phase3.title')}
                  </h2>
                  <p className="text-[#a9abb3] leading-relaxed font-light mb-6 text-sm">
                    {t('how.phase3.desc')}
                  </p>
                  <div className="space-y-4 pt-4 border-t border-[#2e323b]/40">
                    <h4 className="text-[10px] font-mono text-[#62e086] uppercase tracking-widest font-bold">
                      {t('how.phase3.safety_header')}
                    </h4>
                    {[
                      t('how.phase3.safety.1'),
                      t('how.phase3.safety.2'),
                      t('how.phase3.safety.3')
                    ].map((text, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#62e086] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#ecedf6] font-light leading-relaxed">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Execution steps layout */}
              <div className="lg:col-span-7 space-y-6">
                {executionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-6 p-6 rounded-2xl border border-[#2e323b]/60 bg-[#161a21]/80 hover:border-[#62e086]/30 transition-all duration-300 group hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-full border border-[#2e323b] bg-[#10131a] flex items-center justify-center text-[#ecedf6] font-mono font-bold text-sm group-hover:text-[#62e086] group-hover:border-[#62e086]/30 transition-colors">
                        {step.step}
                      </div>
                      {idx !== executionSteps.length - 1 && (
                        <div className="w-[1px] h-full bg-[#2e323b] mt-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-bold mb-2 text-[#ecedf6] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#a9abb3] leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: PAYOUT & REFUND (Clear explanation of the 2 refund cases) */}
          {activeTab === 'payout' && (
            <div className="space-y-8">
              <div className="bg-[#10131a]/80 border border-[#2e323b]/60 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-md">
                <div className="max-w-3xl">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#ecedf6]">
                    {t('how.phase4.title')}
                  </h2>
                  <p className="text-[#a9abb3] leading-relaxed font-light text-sm">
                    {t('how.phase4.subtitle')}
                  </p>
                </div>
              </div>

              {/* Main side-by-side Creator withdraw vs Backer refund splits */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Creator Withdraw card */}
                <div className="bg-[#161a21]/90 border border-[#2e323b]/60 rounded-2xl p-8 hover:border-[#62e086]/30 transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#62e086] uppercase tracking-wider bg-[#62e086]/5 border border-[#62e086]/20 px-2 py-0.5 rounded block w-fit mb-4">
                      {t('how.phase4.creator_badge')}
                    </span>
                    <h3 className="text-lg font-bold mb-4 text-[#ecedf6] group-hover:text-white transition-colors">
                      {t('how.phase4.withdraw.title')}
                    </h3>
                    <p className="text-xs text-[#a9abb3] leading-relaxed font-light mb-6">
                      {t('how.phase4.withdraw.desc')}
                    </p>

                    <div className="space-y-4">
                      <div className="p-4 bg-[#10131a]/60 border border-[#2e323b]/60 rounded-xl">
                        <h4 className="text-sm font-bold text-[#62e086] mb-1.5">
                          {t('how.phase4.withdraw.step1.title')}
                        </h4>
                        <p className="text-xs text-[#a9abb3] leading-relaxed font-light">
                          {t('how.phase4.withdraw.step1.desc')}
                        </p>
                      </div>

                      <div className="p-4 bg-[#10131a]/60 border border-[#2e323b]/60 rounded-xl">
                        <h4 className="text-sm font-bold text-[#62e086] mb-1.5">
                          {t('how.phase4.withdraw.step2.title')}
                        </h4>
                        <p className="text-xs text-[#a9abb3] leading-relaxed font-light">
                          {t('how.phase4.withdraw.step2.desc')}
                        </p>
                      </div>

                      <div className="p-4 bg-[#10131a]/60 border border-[#2e323b]/60 rounded-xl">
                        <h4 className="text-sm font-bold text-[#62e086] mb-1.5">
                          {t('how.phase4.withdraw.step3.title')}
                        </h4>
                        <p className="text-xs text-[#a9abb3] leading-relaxed font-light">
                          {t('how.phase4.withdraw.step3.desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supporters Refund cases (Explicitly lists the 2 clear cases) */}
                <div className="bg-[#161a21]/90 border border-[#2e323b]/60 rounded-2xl p-8 hover:border-[#ff716c]/30 transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#ff716c] uppercase tracking-wider bg-[#ff716c]/5 border border-[#ff716c]/20 px-2 py-0.5 rounded block w-fit mb-4">
                      {t('how.phase4.backer_badge')}
                    </span>
                    <h3 className="text-lg font-bold mb-4 text-[#ecedf6] group-hover:text-white transition-colors">
                      {t('how.phase4.refund.title')}
                    </h3>
                    <p className="text-xs text-[#a9abb3] leading-relaxed font-light mb-6">
                      {t('how.phase4.refund.desc')}
                    </p>

                    <div className="space-y-4">
                      <div className="p-4 bg-[#10131a]/60 border border-[#2e323b]/60 rounded-xl">
                        <h4 className="text-sm font-bold text-[#ff716c] mb-1.5">
                          {t('how.phase4.refund.case1.title')}
                        </h4>
                        <p className="text-xs text-[#a9abb3] leading-relaxed font-light">
                          {t('how.phase4.refund.case1.desc')}
                        </p>
                      </div>

                      <div className="p-4 bg-[#10131a]/60 border border-[#2e323b]/60 rounded-xl">
                        <h4 className="text-sm font-bold text-[#ff716c] mb-1.5">
                          {t('how.phase4.refund.case2.title')}
                        </h4>
                        <p className="text-xs text-[#a9abb3] leading-relaxed font-light">
                          {t('how.phase4.refund.case2.desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* General warning info box */}
              <div className="bg-[#ff716c]/5 border border-[#ff716c]/20 p-5 rounded-2xl flex items-start gap-4 mt-8">
                <Info className="w-5 h-5 text-[#ff716c] shrink-0 mt-0.5" />
                <p className="text-xs text-[#ff716c] leading-relaxed">
                  {t('how.phase4.warning')}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
