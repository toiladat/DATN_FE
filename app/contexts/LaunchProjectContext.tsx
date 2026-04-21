import React, { createContext, useContext, useEffect, useState } from 'react'

// Types for each step data
export interface BasicsData {
  title: string
  subtitle: string
  primaryCategory: string
  secondaryCategory?: string
  location?: string
  image: string[] // URL or base64
  video?: string
  fundingGoal: number
  startDate: string // ISO string
  endDate: string
  description: string
  risks: string
}

export interface Milestone {
  name: string
  description: string
  durationDays: number
  startDate: string
  endDate: string
  budget: number
  advantages?: string
  challenges?: string
  images?: string[]
  expectedOutcome: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  wallet: string
  avatar: string
}

export interface ProjectData {
  basics: BasicsData
  milestones: Milestone[]
  team: TeamMember[]
  milestoneDraft: Milestone
  milestoneCache: Record<string, string>
  updatedAt?: number
}

const LOCAL_STORAGE_KEY = 'stitch_project_launch_data'

export const defaultMilestone: Milestone = {
  name: '',
  description: '',
  durationDays: 0,
  startDate: '',
  endDate: '',
  budget: 0,
  expectedOutcome: '',
  images: [],
  advantages: '',
  challenges: ''
}

const defaultProjectData: ProjectData = {
  basics: {
    title: '',
    subtitle: '',
    primaryCategory: '',
    fundingGoal: 0,
    image: [],
    startDate: '',
    endDate: '',
    description: '',
    risks: ''
  },
  milestones: [],
  team: [],
  milestoneDraft: defaultMilestone,
  milestoneCache: {},
  updatedAt: Date.now()
}

interface LaunchProjectContextProps {
  project: ProjectData
  setBasics: (data: Partial<BasicsData>) => void
  addMilestone: (milestone: Milestone) => void
  updateMilestone: (index: number, milestone: Milestone) => void
  removeMilestone: (index: number) => void
  setTeam: (team: TeamMember[]) => void
  setMilestoneDraft: (draft: Milestone) => void
  setMilestoneCache: (cache: Record<string, string>) => void
}

const LaunchProjectContext = createContext<
  LaunchProjectContextProps | undefined
>(undefined)

export const LaunchProjectProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [project, setProject] = useState<ProjectData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          return {
            ...defaultProjectData,
            ...parsed,
            // Ensure newly added top-level properties are always initialized if missing
            milestoneDraft:
              parsed.milestoneDraft || defaultProjectData.milestoneDraft,
            milestoneCache:
              parsed.milestoneCache || defaultProjectData.milestoneCache
          }
        }
        return defaultProjectData
      } catch (e) {
        console.error('Failed to load project data:', e)
        return defaultProjectData
      }
    }
    return defaultProjectData
  })

  // Auto-save on every change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(project))
    }
  }, [project])

  const setBasics = (data: Partial<BasicsData>) => {
    setProject((prev) => ({
      ...prev,
      basics: { ...prev.basics, ...data },
      updatedAt: Date.now()
    }))
  }

  const addMilestone = (milestone: Milestone) => {
    setProject((prev) => ({
      ...prev,
      milestones: [...prev.milestones, milestone],
      updatedAt: Date.now()
    }))
  }

  const updateMilestone = (index: number, milestone: Milestone) => {
    setProject((prev) => {
      const newMilestones = [...prev.milestones]
      newMilestones[index] = milestone
      return { ...prev, milestones: newMilestones, updatedAt: Date.now() }
    })
  }

  const removeMilestone = (index: number) => {
    setProject((prev) => {
      const newMilestones = prev.milestones.filter((_, i) => i !== index)
      return { ...prev, milestones: newMilestones, updatedAt: Date.now() }
    })
  }

  const setTeam = (team: TeamMember[]) => {
    setProject((prev) => ({ ...prev, team, updatedAt: Date.now() }))
  }

  const setMilestoneDraft = (draft: Milestone) => {
    setProject((prev) => ({
      ...prev,
      milestoneDraft: draft,
      updatedAt: Date.now()
    }))
  }

  const setMilestoneCache = (cache: Record<string, string>) => {
    setProject((prev) => ({
      ...prev,
      milestoneCache: cache,
      updatedAt: Date.now()
    }))
  }

  return (
    <LaunchProjectContext.Provider
      value={{
        project,
        setBasics,
        addMilestone,
        updateMilestone,
        removeMilestone,
        setTeam,
        setMilestoneDraft,
        setMilestoneCache
      }}
    >
      {children}
    </LaunchProjectContext.Provider>
  )
}

export const useLaunchProject = () => {
  const ctx = useContext(LaunchProjectContext)
  if (!ctx) {
    throw new Error(
      'useLaunchProject must be used within LaunchProjectProvider'
    )
  }
  return ctx
}
