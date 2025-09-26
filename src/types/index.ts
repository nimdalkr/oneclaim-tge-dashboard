// Legacy types (for backward compatibility)
export interface Chain {
  id: string
  name: string
  symbol: string
  logo: string
  color: string
  gradientClass: string
}

export interface ClaimableReward {
  chainId: string
  tokenSymbol: string
  amount: number
  usdValue: number
  isClaimable: boolean
  estimatedGas?: number
}

// New TGE Airdrop types
export interface StakingOption {
  duration: '1M' | '3M' | '6M'
  apr: number
  displayName: string
}

export interface TGEAirdrop {
  id: string
  chain: string
  token: string
  amount: number
  claimable: boolean
  stakingOptions: StakingOption[]
  tokenIcon?: string
  chainIcon?: string
}

export interface StakingDecision {
  airdropId: string
  willStake: boolean
  duration?: '1M' | '3M' | '6M'
  apr?: number
  estimatedRewards?: number
}

// Wallet types
export interface WalletState {
  isConnected: boolean
  address: string | null
  isConnecting: boolean
}

// Claim and Staking state
export interface ClaimAndStakeState {
  selectedAirdrops: string[]
  stakingDecisions: StakingDecision[]
  isProcessing: boolean
  results: ClaimAndStakeResult[]
}

export interface ClaimAndStakeResult {
  airdropId: string
  success: boolean
  claimed: boolean
  staked: boolean
  txHash?: string
  error?: string
}

// Legacy claim types (for backward compatibility)
export interface ClaimState {
  selectedChains: string[]
  isProcessing: boolean
  results: ClaimResult[]
}

export interface ClaimResult {
  chainId: string
  success: boolean
  txHash?: string
  error?: string
}

// Toast types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  description?: string
  duration?: number
}

// Summary types
export interface ClaimSummaryData {
  totalClaimableChains: number
  totalUsdValue: number
  estimatedGasFee: number
  selectedChains: string[]
}

export interface TGESummaryData {
  totalClaimableTokens: number
  totalStakingDecisions: number
  estimatedTotalRewards: number
  selectedAirdrops: string[]
  stakingDecisions: StakingDecision[]
}

// Staking Dashboard types
export interface StakedPosition {
  id: string
  airdropId: string
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