import { TGESummaryData, StakingDecision } from '@/types'
import { MockAirdrop } from '@/data/mockAirdrops'

export const calculateTGESummary = (
  airdrops: MockAirdrop[],
  selectedAirdrops: string[],
  stakingDecisions: StakingDecision[]
): TGESummaryData => {
  const claimableAirdrops = airdrops.filter(a => a.claimable)
  const selectedClaimableAirdrops = airdrops.filter(a =>
    selectedAirdrops.includes(a.id) && a.claimable
  )

  const stakingDecisionsForSelected = stakingDecisions.filter(d =>
    d.willStake && selectedAirdrops.includes(d.airdropId)
  )

  const estimatedTotalRewards = stakingDecisionsForSelected.reduce((total, decision) => {
    return total + (decision.estimatedRewards || 0)
  }, 0)

  return {
    totalClaimableTokens: claimableAirdrops.length,
    totalStakingDecisions: stakingDecisionsForSelected.length,
    estimatedTotalRewards,
    selectedAirdrops,
    stakingDecisions: stakingDecisionsForSelected
  }
}

export const formatTokenAmount = (amount: number, symbol: string): string => {
  return `${amount.toLocaleString()} ${symbol}`
}

export const formatPercentage = (value: number): string => {
  return `${value}%`
}

export const getDurationDisplay = (duration: '1M' | '3M' | '6M'): string => {
  const map = {
    '1M': '1 month',
    '3M': '3 months',
    '6M': '6 months'
  }
  return map[duration]
}