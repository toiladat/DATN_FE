import {
  Sidebar,
  SidebarContent,
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

  const steps: { id: string; label: string; icon: string; num: string }[] = [
    { id: 'Overview', label: 'Overview', icon: 'dashboard', num: '01' },
    { id: 'Basics', label: 'Basics', icon: 'info', num: '02' },
    { id: 'Milestones', label: 'Milestones', icon: 'pending', num: '03' },
    { id: 'Team', label: 'Team', icon: 'group', num: '04' }
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
            <h3 className="text-[#ecedf6] font-bold text-base font-['Space_Grotesk'] truncate">
              Launch Project
            </h3>
            <p className="text-[#45484f] text-xs mt-1 truncate font-mono tracking-widest uppercase">
              Wizard
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
            <SidebarMenu className="gap-1">
              {steps.map((step) => {
                const isActive = currentStep === step.id
                return (
                  <SidebarMenuItem key={step.id}>
                    <SidebarMenuButton
                      tooltip={step.label}
                      onClick={() => onStepChange(step.id)}
                      isActive={isActive}
                      className={`
                        h-11 rounded-xl
                        transition-all duration-200
                        ${
                          isActive
                            ? 'bg-[#1c2028] text-[#ecedf6] font-semibold'
                            : 'text-[#73757d] hover:bg-[#161a21] hover:text-[#a9abb3]'
                        }
                      `}
                    >
                      <span
                        className={`material-symbols-outlined text-xl shrink-0 ${
                          isActive ? 'text-[#8ff5ff]' : ''
                        }`}
                      >
                        {step.icon}
                      </span>
                      <span className="font-['Inter'] text-sm truncate">
                        {step.label}
                      </span>
                      {isActive && !isCollapsed && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8ff5ff] shadow-[0_0_6px_#8ff5ff] shrink-0" />
                      )}
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
