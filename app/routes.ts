import {
  type RouteConfig,
  index,
  layout,
  route
} from '@react-router/dev/routes'

export default [
  layout('./layouts/MainLayout.tsx', [
    index('./routes/Home.tsx'),
    route('projects', './routes/Projects.tsx'),
    route('projects/:id', './routes/PublicProjectDetail.tsx'),
    route('my-project', './routes/MyProject.tsx'),
    route('my-project/:id', './routes/ProjectDetail.tsx'),
    route('invested', './routes/Invested.tsx'),
    route('launch-project', './routes/LaunchProject.tsx'),
    route('profile', './routes/Profile.tsx'),
    route('how-it-works', './routes/HowItWorks.tsx')
  ])
] satisfies RouteConfig
