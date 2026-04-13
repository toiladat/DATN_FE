import { useState } from 'react'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { LaunchSidebar } from '@/components/launchProjectPage/LaunchSidebar'
import { OverviewStep } from '@/components/launchProjectPage/OverviewStep'
import { StoryStep } from '@/components/launchProjectPage/StoryStep'
import { BasicsStep } from '@/components/launchProjectPage/BasicsStep'
import { MilestonesStep } from '@/components/launchProjectPage/MilestonesStep'

export default function LaunchProject() {
  const [currentStep, setCurrentStep] = useState<string>('Overview')

  // Xử lý render content bên phải dựa vào state
  const renderContent = () => {
    switch (currentStep) {
      case 'Overview':
        return <OverviewStep />
      case 'Basics':
        return <BasicsStep />
      case 'Milestones':
        return <MilestonesStep />
      case 'Story':
        return <StoryStep />
      // Tương tự cho các bước khác (Basics, Funding, Team...)
      // Tạm thời render rỗng nếu chưa có component
      default:
        return (
          <div className="flex flex-col items-center justify-center p-20 h-96 text-center w-full max-w-5xl mx-auto">
            <span className="material-symbols-outlined text-6xl text-[#45484f] mb-4">
              construction
            </span>
            <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-2">
              {currentStep} Module
            </h2>
            <p className="text-[#a9abb3]">
              This section is currently under development.
            </p>
          </div>
        )
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background w-full">
        {/* Sidebar điều hướng (Cố định bên trái) */}
        <LaunchSidebar
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />

        {/* Content Canvas */}
        <SidebarInset className="bg-transparent flex-1 pt-24 px-6 md:px-12 pb-12 overflow-x-hidden relative">
          {/* Nút Toggle Sidebar (Chỉ chạy trên Shadcn Sidebar) */}
          <div className="absolute top-24 left-6 md:left-8 z-50">
            <SidebarTrigger className="text-[#a9abb3] hover:text-[#8ff5ff] hover:bg-[#8ff5ff]/10 bg-[#161a21] border border-[#45484f]/20 shadow-md" />
          </div>

          <div className="mt-12 w-full">{renderContent()}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
