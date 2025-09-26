export interface StakedPosition {
  id: string
  airdropId: string
  projectName: string
  tokenSymbol: string
  tokenIcon: string
  chainName: string
  stakedAmount: number
  stakingApr: number
  lockDuration: '1M' | '3M' | '6M'
  stakingStartDate: Date
  unlockDate: Date
  estimatedRewards: number
  accruedRewards: number
  status: 'locked' | 'unlocked' | 'claimed'
}

export interface ClaimedAirdrop {
  id: string
  airdropId: string
  projectName: string
  tokenSymbol: string
  tokenIcon: string
  chainName: string
  claimedAmount: number
  claimDate: Date
  txHash: string
  wasStaked: boolean
  stakingPositionId?: string
}

export interface StakingDashboardData {
  totalStakedValue: number
  totalPendingRewards: number
  activePositions: StakedPosition[]
  unlockedPositions: StakedPosition[]
  claimHistory: ClaimedAirdrop[]
}