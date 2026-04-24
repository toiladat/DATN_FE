export const PROJECT_DETAIL_DATA = {
  hero: {
    tag: 'Project Spotlight',
    title: 'NeuralNexus Core',
    description:
      'Decentralized neural computation layers for the next generation of autonomous AI agents. Scaling intelligence without central gatekeepers.'
  },
  media: {
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBovBTSWursPoaKHDOANWVnWGNrk2IvO8eLk6c1tBX91bXp558k-xTB25JS_FOow4C2GJc-GxNs3hS3ZUXu2U7dzS4-cQkpvSx4Atwct0krCgU39VAwils2UwdWQOnDENjWHycMBCCA9MNcdPLPwVJ6aGm-RonP-ST-Ni_DK33U6MyGujihXID4SWhId9EFvjihqcsFYudHnwxbcF1aoCepAkv8AObxKGpsrSCGY8WlzCkOjlBQBbN8zqCpJBouObOiGIUEUTz7M2M',
    tags: [
      { label: 'AI/ML', color: 'primary' },
      { label: 'DEPIN', color: 'secondary' }
    ]
  },
  stats: {
    raisedETH: 410,
    goalETH: 500,
    progressPercentage: 82,
    backers: '1,240',
    daysLeft: '14'
  },
  trustIndicators: [
    { icon: 'verified_user', text: 'Smart Contract Audited by VoidSec' },
    { icon: 'terminal', text: 'Open Source MIT License' }
  ],
  creator: {
    name: 'Nexus Labs',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBE-SfjE02tol-m5AQ0Pam7KBCya1bEBm2uwMYLLMWVAtG0jW8OWHe9iQooZoUZGbDeM0lhpGgS182MAG7sfemNGd9Kh1Zjtduk0Zw2hKfu96ysCzb5t8oOeIamfO1OnTYE3wtYdNobusv3_Zo4aYAS0Civi_ruZihXzerTUSsH4NBoGRWQKEcyy0fvT24laIKjlSj9AWwmuJoON2ouowDJSKzzeS8-WK9az4SmpyIPfmwXMzx9vN_f7IJEEoEj6azMLk2pYl5dngI',
    location: 'San Francisco, CA',
    projectsCount: 4
  },
  content: {
    mainImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-WyOTaWBdPVWB_2ctFfy74q5RZjaKLighSQwalSRZxEVj7yF8deTYKKOOAfiO2BBIUPlBCjkC3KOHKwNBemZBbpVYBXxDeLC3_7Tq8lO31wU_hm11ASBsbleF78o9WfFcHlhg2MzrB_E90ko1ycW_bBuu65ZCSBspj8tU7Wck4_oAPg3L6LCg-RCyq7rTnD3VSPaU3G4qSNQagbwg8Q8ycXj0Co9Qbf4eXaaKWTAJphqyMWYiRbBtaQ0JsU52LItVH18xAnS4qLE',
    sections: [
      {
        title: 'The Future of Compute',
        body: "NeuralNexus Core isn't just another blockchain project. It's the foundational layer for decentralized intelligence. By leveraging a custom ZK-proof protocol, we enable browsers and low-power devices to contribute to a global neural network, earning rewards while securing the network's cognitive integrity."
      },
      {
        title: 'The Neural Layer',
        body: 'We are building a multi-phase infrastructure that allows for seamless integration of AI models into smart contracts. This allows developers to build truly "smart" applications that can interpret data, predict outcomes, and evolve based on user interaction without relying on centralized API providers.',
        features: [
          {
            icon: 'memory',
            title: 'Edge Computing',
            description:
              'Distribute workload across thousands of nodes globally for maximum resilience.',
            color: 'primary'
          },
          {
            icon: 'shield_lock',
            title: 'Privacy First',
            description:
              'Encrypted computation ensures data remains private even while being processed.',
            color: 'secondary'
          }
        ]
      }
    ],
    roadmap: [
      {
        phase: 'Phase 1: Genesis (Completed)',
        title: 'Protocol Architecture',
        description:
          'Drafting the core Whitepaper and initial smart contract framework on Ethereum Layer 2.',
        status: 'completed'
      },
      {
        phase: 'Phase 2: Alpha (Completed)',
        title: 'Testnet Deployment',
        description:
          'Deployment of the internal testnet and recruitment of first 100 node operators.',
        status: 'completed'
      },
      {
        phase: 'Phase 3: Integration (In Progress)',
        title: 'Neural Network Layer',
        description:
          'Mainnet launch of the decentralized computation engine and integration with major L2 networks.',
        status: 'active'
      }
    ]
  },
  tiers: [
    {
      id: 1,
      title: 'Early Adopter',
      priceETH: 0.5,
      limit: 45,
      isPopular: false,
      perks: [
        'Genesis Node NFT',
        'Early Access to SDK',
        'Private Discord Access'
      ],
      delivery: 'Oct 2024',
      theme: 'primary' // Indicates which color to emphasize on hover
    },
    {
      id: 2,
      title: 'Protocol Founder',
      priceETH: 5.0,
      limit: 12,
      isPopular: true,
      perks: [
        "Founder's Edition Hardware Node",
        '1.5x Staking Multiplier',
        'Governance Voting Power (2x)',
        'Name in the Genesis Block'
      ],
      delivery: 'Dec 2024',
      theme: 'secondary'
    },
    {
      id: 3,
      title: 'Institutional Partner',
      priceETH: 25,
      limit: 2,
      isPopular: false,
      description:
        'Exclusive access for venture funds and infrastructure providers looking to secure the network core.',
      perks: [],
      delivery: 'Jan 2025',
      theme: 'primary'
    }
  ]
}

/**
 * Mock data mô phỏng response từ BE — khớp với ProjectSummary schema.
 * Khi tích hợp BE thật, chỉ cần thay thế bằng API call, không cần sửa gì ở FE.
 */
import type { ProjectSummary } from '@/schemas/projectSchema'

const NOW = Date.now()
const DAY = 1000 * 60 * 60 * 24

export const PROJECTS_DIRECTORY_DATA: ProjectSummary[] = [
  {
    id: '1',
    title: 'NeuralNexus Core',
    description:
      'Decentralized compute layer for large-scale language model training with zero-knowledge proofs.',
    status: 'active',
    fundingGoal: 500,
    raisedAmount: 410,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiedYlpbNO-IiU-iBg-C4l1WVaNIYIZqSr-poXXkndGbrOotQhd1Dip7ZPQiGqQJfktGfhW0-nfi-4MXVjrS3PQcaUhPsSNfMO0RKmnafOrz8ID9kS8UaRCws3L4Y8WAvNBjeSHjrToqE7N5PVFhyXhS93y4cOs1lHaR90FYdqWnde-Z2tl32yOrsgSThgxm1ZgY_MmR_6Xld-9RcsL_E_2PZn4tkk3V3BUJYmVbaO-u9CtYYSpB7jRKElGyGrQT9mnGgSSt8YIds',
    primaryCategory: 'AI',
    startDate: NOW - 30 * DAY,
    endDate: NOW + 14 * DAY,
    updatedAt: NOW - 1 * DAY,
    totalMilestones: 4,
    completedMilestones: 2
  },
  {
    id: '2',
    title: 'EtherLoom Protocol',
    description:
      'Next-generation cross-chain bridging infrastructure focusing on atomic swaps and sub-second finality.',
    status: 'pending',
    fundingGoal: 800,
    raisedAmount: 800,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDr23fNr1CygDDOv6H7giNgw9Q0lfcwgBznflNnLRYtCfpDNX2x75xLMlM61hYNZJDbT0q2RvS8-drrekEWEZJ4YgDwKNE_oKSkLmxr8sieYPxHJlto4oqXQaZV6rje1Bnlq-P_YQ3_gVhwH0hNgkT6OltTKrD7GXtEBLSnM68eK8Xn8GUHtCcViIuORcAD2qDdhpzgRsT1oLsEbC64Z3OQcsVM02Rwsx62TzPAxXhohym2EtGCvC8UMWxlOL3OvSFBGjzF8S0Ores',
    primaryCategory: 'Infrastructure',
    startDate: NOW - 90 * DAY,
    endDate: NOW + 120 * DAY,
    updatedAt: NOW - 3 * DAY,
    totalMilestones: 5,
    completedMilestones: 2
  },
  {
    id: '3',
    title: 'Neon District: Origins',
    description:
      'Massively multiplayer RPG set in a dystopian future where players own their equipment as upgradable NFTs.',
    status: 'active',
    fundingGoal: 2000,
    raisedAmount: 900,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiL1gwn_BOJEockwroLPKxvRpv5mobdZvzm3ovwUUISv0VPYBpbnHjx0s5ylg-BbAUw9-PkEqhQsfsgNZonZdO7INpnVb0c2O50gw-S6yGSJmTqfUvFt7FlwmFn4OKHIaxMq8Wh5kTUOsvpLKJI0DD_kZCvHbzrRmImEMPAF2A6cw--YFfqa-bvu3i-cpSB2STQNX37sqt3Q540mMTkpfG201YAPMIlpSgk6GEbseZ-wYyRBPX0r3ElxOhZN1D9Fq6y2JgdO_JIlY',
    primaryCategory: 'Gaming',
    startDate: NOW - 10 * DAY,
    endDate: NOW + 32 * DAY,
    updatedAt: NOW - 2 * DAY,
    totalMilestones: 6,
    completedMilestones: 1
  },
  {
    id: '4',
    title: 'Vortex VR Mesh',
    description:
      'Spatial computing protocol for seamless interoperability between different VR environments.',
    status: 'progress',
    fundingGoal: 1200,
    raisedAmount: 1200,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXkBtfDW1slgNHT7JALCnLwXe2FNSnH2qsLBZZcKmSZUMSmh6merSEtTDVT215JgE9VLN9V1MzecbSd2JeOcIRfsdaYjQzjT7-GiX0Z9weOum3iy3jzDejiOTElk0sjLF29YAZzthNitu4qPWYXs2K_gzhPdb4e2cbis8K0M9QU2d0rCheCrs03iZgzhFm1UqNYxrUjuSCOOV2dEhSFVpZQlwnViAzK-Bzu9QkhV6rPcmwErIGlfvhcISYIRN32GpWBYhAkpNbquw',
    primaryCategory: 'Metaverse',
    startDate: NOW - 60 * DAY,
    endDate: NOW + 180 * DAY,
    updatedAt: NOW - 5 * DAY,
    totalMilestones: 4,
    completedMilestones: 0
  },
  {
    id: '5',
    title: 'YieldOracle V3',
    description:
      'Autonomous algorithmic yield aggregator that optimizes portfolio distribution across 12 chains.',
    status: 'active',
    fundingGoal: 1000,
    raisedAmount: 180,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXmjOH3MVLdcT6E94axPyBlhOTKZwcEDZ2Cx1ULjGMZpXVhr8EWuFkE8uzAHpi8j6govyzQB3FsiqC1wZJ-xsYiFfogTvbc_dosyTEVRAUl-PvvUdUVHyrsEGNSURMxNhC6PjJsiv8MO8zPBeBB4onqzWXwFUDpGqIKSspFmf55s41zK3tmNUKMh1g9H41ZTMluVhzTPd5ly6XGbCz2pLY44ggBbbcH5moDcb_gyi4mTuuXc0KfkQ4htrz44oDze064H-MgdYEZJI',
    primaryCategory: 'DeFi',
    startDate: NOW - 5 * DAY,
    endDate: NOW + 45 * DAY,
    updatedAt: NOW - 1 * DAY,
    totalMilestones: 5,
    completedMilestones: 1
  },
  {
    id: '6',
    title: 'ShadowVault ZK',
    description:
      'Anonymized transaction layer for corporate treasury management on public blockchains.',
    status: 'pending',
    fundingGoal: 600,
    raisedAmount: 600,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCb6zQ7uX1897Ug-J0wAhNNhB17klFUblw5wrWMewRvmM5N5F8r4PBQy5QixHbEFgND4BqSZMXjazVKThTXJl74uz3-puF2BDdHRCeWLrTsDy9nLwhI9YpVS_RgOVhaqPa1xD0WqeEvpFnq0Se-OF4ARk__MbOej8LfwkSzRVYAMvCr9bJ-F7zErtl8xN2t0V0DxD4Ol7o-qXuCwwGWscxRq8THmjOz8UdsLArTjWVE1GG0gBntNd7e46BhIlyIejye_nuFax8NTAg',
    primaryCategory: 'Privacy',
    startDate: NOW - 120 * DAY,
    endDate: NOW + 90 * DAY,
    updatedAt: NOW - 7 * DAY,
    totalMilestones: 5,
    completedMilestones: 3
  }
]
