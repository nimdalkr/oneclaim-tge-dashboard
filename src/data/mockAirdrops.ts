export interface StakingOption {
  duration: '1M' | '3M' | '6M'
  apr: number
  displayName: string
}

export interface OnChainStaking {
  stakedAmount: number
  stakingApr: number
  lockDuration: string
  unlockDate: string
  estimatedRewards: number
  accruedRewards: number
}

export interface MockAirdrop {
  id: string
  projectName: string
  chain: string
  token: string
  amount: number
  claimable: boolean
  stakingOptions: StakingOption[]
  tokenIcon?: string
  chainIcon?: string
  tgeDate?: string
  onChainStaking?: OnChainStaking
  isAlreadyStaked?: boolean
}

export const mockAirdrops: MockAirdrop[] = [
  {
    id: 'enso-chain',
    projectName: 'ENSO',
    chain: 'ENSO',
    token: '$ENSO',
    amount: 85,
    claimable: true,
    tokenIcon: '/logos/enso.jpg',
    chainIcon: '🟢',
    tgeDate: '2025-10-01',
    stakingOptions: [
      { duration: '1M', apr: 6, displayName: '1 month' },
      { duration: '3M', apr: 12, displayName: '3 months' },
      { duration: '6M', apr: 18, displayName: '6 months' }
    ]
  },
  {
    id: 'plasma-chain',
    projectName: 'Plasma',
    chain: 'Plasma',
    token: '$XPL',
    amount: 0,
    claimable: false,
    tokenIcon: '/logos/plasma.jpg',
    chainIcon: '🔷',
    tgeDate: '2025-09-25',
    isAlreadyStaked: true,
    onChainStaking: {
      stakedAmount: 500,
      stakingApr: 12,
      lockDuration: '6 months',
      unlockDate: '2025-03-25',
      estimatedRewards: 30,
      accruedRewards: 15.5
    },
    stakingOptions: [
      { duration: '1M', apr: 4, displayName: '1 month' },
      { duration: '3M', apr: 8, displayName: '3 months' },
      { duration: '6M', apr: 12, displayName: '6 months' }
    ]
  },
  {
    id: 'allora-cosmos',
    projectName: 'Allora Network',
    chain: 'COSMOS L1',
    token: '$ALLO',
    amount: 230,
    claimable: true,
    tokenIcon: '/logos/allora.png',
    chainIcon: '🔵',
    tgeDate: '2025-10-15',
    stakingOptions: [
      { duration: '1M', apr: 3, displayName: '1 month' },
      { duration: '3M', apr: 6, displayName: '3 months' },
      { duration: '6M', apr: 9, displayName: '6 months' }
    ]
  },
  {
    id: 'mira-multichain',
    projectName: 'Mira Network',
    chain: 'BSC, Base',
    token: '$MIRA',
    amount: 0,
    claimable: false,
    tokenIcon: '/logos/mira.png',
    chainIcon: '🔴',
    tgeDate: '2025-09-26',
    stakingOptions: [
      { duration: '1M', apr: 5, displayName: '1 month' },
      { duration: '3M', apr: 10, displayName: '3 months' },
      { duration: '6M', apr: 15, displayName: '6 months' }
    ]
  },
  {
    id: 'opensea-ethereum',
    projectName: 'Opensea',
    chain: 'Ethereum',
    token: '$SEA',
    amount: 120,
    claimable: true,
    tokenIcon: '🌊',
    chainIcon: '⚫',
    tgeDate: '2025-11-01',
    stakingOptions: [
      { duration: '1M', apr: 4, displayName: '1 month' },
      { duration: '3M', apr: 8, displayName: '3 months' },
      { duration: '6M', apr: 14, displayName: '6 months' }
    ]
  }
]

export interface StakingDecision {
  airdropId: string
  willStake: boolean
  duration?: '1M' | '3M' | '6M'
  apr?: number
  estimatedRewards?: number
}

export const calculateStakingRewards = (
  amount: number,
  apr: number,
  duration: '1M' | '3M' | '6M'
): number => {
  const months = duration === '1M' ? 1 : duration === '3M' ? 3 : 6
  const monthlyRate = apr / 100 / 12
  return Math.round(amount * monthlyRate * months * 100) / 100
}

export const simulateClaimAndStaking = (
  airdrops: MockAirdrop[],
  stakingDecisions: StakingDecision[]
): Promise<{ success: boolean; message: string; details: string[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const claimableAirdrops = airdrops.filter(a => a.claimable)
      const stakingCount = stakingDecisions.filter(d => d.willStake).length

      const details: string[] = []

      claimableAirdrops.forEach(airdrop => {
        details.push(`✅ ${airdrop.amount} ${airdrop.token} claimed successfully`)

        const stakingDecision = stakingDecisions.find(d => d.airdropId === airdrop.id)
        if (stakingDecision?.willStake) {
          details.push(`📈 ${airdrop.amount} ${airdrop.token} staked for ${stakingDecision.duration} (APR: ${stakingDecision.apr}%)`)
        }
      })

      resolve({
        success: true,
        message: stakingCount > 0
          ? `${claimableAirdrops.length} tokens claimed and ${stakingCount} staked successfully!`
          : `${claimableAirdrops.length} tokens claimed successfully!`,
        details
      })
    }, 2000)
  })
}