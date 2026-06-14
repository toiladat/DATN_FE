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
import { useTranslation } from 'react-i18next'

interface LaunchSidebarProps {
  currentStep: string
  onStepChange: (step: string) => void
}

export function LaunchSidebar({
  currentStep,
  onStepChange
}: LaunchSidebarProps) {
  const { state } = useSidebar()
  const { t } = useTranslation()
  const isCollapsed = state === 'collapsed'

  const steps: { id: string; label: string; icon: string; num: string }[] = [
    { id: 'Overview', label: t('step.overview'), icon: 'dashboard', num: '01' },
    { id: 'Basics', label: t('step.basics'), icon: 'info', num: '02' },
    {
      id: 'Milestones',
      label: t('step.milestones'),
      icon: 'pending',
      num: '03'
    },
    { id: 'Team', label: t('step.team'), icon: 'group', num: '04' },
    {
      id: 'Attachments',
      label: t('step.attachments'),
      icon: 'attach_file',
      num: '05'
    }
  ]

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border group/sidebar z-40 bg-card"
    >
      {/* Header */}
      <SidebarHeader className="py-8 px-4 h-24 mb-4">
        {!isCollapsed ? (
          <div className="px-2 transition-opacity duration-300">
            <h3 className="text-foreground font-bold text-base font-['Space_Grotesk'] truncate">
              {t('nav.launch_idea')}
            </h3>
            <p className="text-muted-foreground/45 text-xs mt-1 truncate font-mono tracking-widest uppercase">
              {t('common.wizard')}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <span className="material-symbols-outlined text-neon-cyan">
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
                        h-11 rounded-none border-l-2
                        transition-all duration-200
                        ${
                          isActive
                            ? 'bg-background text-foreground font-semibold border-neon-cyan'
                            : 'text-muted-foreground/60 hover:bg-background hover:text-muted-foreground border-transparent'
                        }
                      `}
                    >
                      <span
                        className={`material-symbols-outlined text-xl shrink-0 ${
                          isActive ? 'text-neon-cyan' : ''
                        }`}
                      >
                        {step.icon}
                      </span>
                      <span className="font-['Inter'] text-sm truncate">
                        {step.label}
                      </span>
                      {isActive && !isCollapsed && (
                        <span className="ml-auto w-1.5 h-1.5 bg-neon-cyan shadow-[0_0_6px_var(--color-neon-cyan)] shrink-0" />
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
