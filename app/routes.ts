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
    route('campaign/:id', './routes/CampaignDetail.tsx'),
    route('my-campaigns', './routes/MyCampaigns.tsx'),
    route('launch-project', './routes/LaunchProject.tsx')
  ])
] satisfies RouteConfig
