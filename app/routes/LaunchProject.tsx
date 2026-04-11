import {
  TaskCard,
  type TaskStatus
} from '@/components/launchProjectPage/TaskCard'
import { SupportCard } from '@/components/launchProjectPage/SupportCard'
import { Card, CardContent } from '@/components/ui/card'
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
    icon: 'pending',
    progress: 65
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

export default function LaunchProject() {
  return (
    <main className="w-full max-w-7xl mx-auto pt-24 px-6 md:px-12 pb-12 font-['Inter']">
      <header className="mb-12 max-w-5xl">
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
      <section className="max-w-5xl space-y-4 mb-20">
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

      {/* Secondary Section: Launch & Support */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Prepare for launch */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-6">
            Prepare for launch
          </h2>
          <Card className="bg-[#22262f]/40 backdrop-blur-xl border-[#8ff5ff]/10 rounded-xl">
            <CardContent className="p-6 space-y-4">
              <div className="w-10 h-10 bg-[#ac89ff]/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ac89ff]">
                  campaign
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-[#ecedf6]">Promotion</h4>
                <p className="text-sm text-[#a9abb3] mt-1">
                  Generate a project URL and activate your pre-launch page.
                </p>
              </div>
              <Button
                variant="link"
                className="text-[#8ff5ff] px-0 hover:underline flex items-center gap-1 h-auto hover:no-underline"
              >
                Get Started{' '}
                <span className="material-symbols-outlined text-xs ml-1">
                  arrow_forward
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-6">
            Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SupportCard
              icon="auto_stories"
              title="Creator Resources"
              description="Learn about shipping logistics and effective community communication."
            />
            <SupportCard
              icon="quiz"
              title="Creator Questions"
              description="Find answers to frequently asked questions about the launch process."
            />
          </div>
        </div>
      </div>
    </main>
  )
}
