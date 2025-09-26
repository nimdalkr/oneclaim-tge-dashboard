import { ClaimableReward, ClaimSummaryData } from '@/types'

export const calculateClaimSummary = (
  rewards: ClaimableReward[],
  selectedChains: string[]
): ClaimSummaryData => {
  const claimableRewards = rewards.filter(r => r.isClaimable)
  const selectedRewards = rewards.filter(r => selectedChains.includes(r.chainId))

  const totalUsdValue = selectedRewards.reduce((sum, reward) => sum + reward.usdValue, 0)
  const estimatedGasFee = selectedRewards.reduce((sum, reward) => sum + (reward.estimatedGas || 0), 0)

  return {
    totalClaimableChains: claimableRewards.length,
    totalUsdValue,
    estimatedGasFee,
    selectedChains
  }
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ko-KR').format(num)
}