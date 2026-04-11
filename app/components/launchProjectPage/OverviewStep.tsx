import {
  TaskCard,
  type TaskStatus
} from '@/components/launchProjectPage/TaskCard'
import { Button } from '@/components/ui/button'

const tasks = [
  {
    title: 'Basics',
    description: 'Name your project, upload an image or video...',
    status: 'Complete' as TaskStatus,
    icon: 'check_circle'
  },
  {
    title: 'Funding',
    description: 'Define your goal and campaign duration...',
    status: 'In Progress' as TaskStatus,
    icon: 'pending'
  },
  {
    title: 'Rewards',
    description: 'Set your rewards and shipping costs.',
    status: 'Not Started' as TaskStatus,
    icon: 'redeem'
  },
  {
    title: 'Story',
    description: 'Add a detailed project description...',
    status: 'Not Started' as TaskStatus,
    icon: 'history_edu'
  },
  {
    title: 'Team',
    description: 'Edit your profile and add collaborators.',
    status: 'Not Started' as TaskStatus,
    icon: 'group'
  },
  {
    title: 'Payment',
    description: 'Verify details and link a wallet.',
    status: 'Not Started' as TaskStatus,
    icon: 'account_balance'
  }
]

export function OverviewStep() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#ecedf6] tracking-tight">
            Project overview
          </h1>
          <div className="flex items-center gap-2 text-[#a9abb3] text-sm hidden md:flex">
            <span className="material-symbols-outlined text-xs">info</span>
            <span>Last edited 2 hours ago</span>
          </div>
        </div>
        <p className="text-[#a9abb3] max-w-2xl mt-4 text-lg">
          Complete the foundational building blocks of your campaign. Each
          section ensures your project meets the Radiant Void verification
          standards.
        </p>
      </header>

      {/* Task List Section */}
      <section className="space-y-4 mb-12">
        {tasks.map((task) => (
          <TaskCard
            key={task.title}
            title={task.title}
            description={task.description}
            status={task.status}
            icon={task.icon}
          />
        ))}
      </section>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 border-t border-[#45484f]/15 pt-8">
        <Button
          variant="outline"
          className="border-[#45484f]/30 bg-[#10131a] text-[#a9abb3] hover:bg-[#22262f] hover:text-[#ecedf6] transition-colors px-6"
        >
          Save Draft
        </Button>
        <Button className="bg-gradient-to-r from-[#00eefc] to-[#8ff5ff] text-[#005359] hover:shadow-[0_0_15px_rgba(143,245,255,0.4)] active:scale-95 transition-all font-bold px-8 shadow-none">
          Publish
        </Button>
      </div>
    </div>
  )
}
