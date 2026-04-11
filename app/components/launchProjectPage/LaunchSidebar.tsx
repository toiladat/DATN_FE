import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'

interface LaunchSidebarProps {
  currentStep: string
  onStepChange: (step: string) => void
}

export function LaunchSidebar({
  currentStep,
  onStepChange
}: LaunchSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  const steps = [
    { id: 'Overview', label: 'Overview', icon: 'dashboard' },
    { id: 'Basics', label: 'Basics', icon: 'info' },
    { id: 'Funding', label: 'Funding', icon: 'payments' },
    { id: 'Rewards', label: 'Rewards', icon: 'card_giftcard' },
    { id: 'Story', label: 'Story', icon: 'auto_stories', fill: true },
    { id: 'Team', label: 'Team', icon: 'group' },
    { id: 'Payment', label: 'Payment', icon: 'account_balance' }
  ]

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#45484f]/15 group/sidebar z-40 bg-[#10131a]"
    >
      {/* Header */}
      <SidebarHeader className="py-8 px-4 h-24 mb-4">
        {!isCollapsed ? (
          <div className="px-2 transition-opacity duration-300">
            <h3 className="text-[#8ff5ff] font-bold text-lg font-['Space_Grotesk'] truncate">
              Project Wizard
            </h3>
            <p className="text-[#a9abb3] text-xs mt-1 truncate">
              Create your vision
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <span className="material-symbols-outlined text-[#8ff5ff]">
              magic_button
            </span>
          </div>
        )}
      </SidebarHeader>

      {/* Content / Nav */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {steps.map((step) => {
                const isActive = currentStep === step.id
                // Nếu đang collapse thì bớt flex-gap và icon margin cho icon về giữa
                return (
                  <SidebarMenuItem key={step.id}>
                    <SidebarMenuButton
                      tooltip={step.label}
                      onClick={() => onStepChange(step.id)}
                      isActive={isActive}
                      className={`
                        h-12 
                        transition-all duration-200 
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-[#8ff5ff]/10 to-transparent text-[#8ff5ff] border-l-2 border-[#8ff5ff] font-semibold'
                            : 'text-[#a9abb3] hover:bg-[#22262f]/80 hover:text-[#ecedf6] border-l-2 border-transparent'
                        }
                      `}
                    >
                      <span
                        className="material-symbols-outlined text-xl transition-all"
                        style={
                          step.fill && isActive
                            ? { fontVariationSettings: "'FILL' 1" }
                            : {}
                        }
                      >
                        {step.icon}
                      </span>
                      <span className="font-['Inter'] text-sm">
                        {step.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
