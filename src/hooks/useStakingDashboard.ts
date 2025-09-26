'use client'

import { useState, useEffect, useCallback } from 'react'
import { StakedPosition, ClaimedAirdrop, StakingDashboardData } from '@/types'

// Mock data for demonstration
const mockStakedPositions: StakedPosition[] = [
  {
    id: 'stake-1',
    airdropId: 'enso-chain',
    projectName: 'ENSO',
    tokenSymbol: '$ENSO',
    tokenIcon: '/logos/enso.jpg',
    chainName: 'ENSO',
    stakedAmount: 85,
    stakingApr: 18,
    lockDuration: '3M',
    stakingStartDate: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000), // 85 days ago
    unlockDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    estimatedRewards: 3.8,
    accruedRewards: 3.6,
    status: 'locked'
  },
  {
    id: 'stake-2',
    airdropId: 'plasma-chain',
    projectName: 'Plasma',
    tokenSymbol: '$XPL',
    tokenIcon: '/logos/plasma.jpg',
    chainName: 'Plasma',
    stakedAmount: 150,
    stakingApr: 12,
    lockDuration: '6M',
    stakingStartDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    unlockDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 150 days from now
    estimatedRewards: 18,
    accruedRewards: 3.2,
    status: 'locked'
  },
  {
    id: 'stake-3',
    airdropId: 'allora-cosmos',
    projectName: 'Allora Network',
    tokenSymbol: '$ALLO',
    tokenIcon: '/logos/allora.png',
    chainName: 'COSMOS L1',
    stakedAmount: 230,
    stakingApr: 9,
    lockDuration: '6M',
    stakingStartDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    unlockDate: new Date(Date.now() + 135 * 24 * 60 * 60 * 1000), // 135 days from now
    estimatedRewards: 20.7,
    accruedRewards: 4.8,
    status: 'locked'
  }
]

const mockClaimHistory: ClaimedAirdrop[] = [
  {
    id: 'claim-1',
    airdropId: 'enso-chain',
    projectName: 'ENSO',
    tokenSymbol: '$ENSO',
    tokenIcon: '/logos/enso.jpg',
    chainName: 'ENSO',
    claimedAmount: 85,
    claimDate: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000),
    txHash: '0x3234...5680',
    wasStaked: true,
    stakingPositionId: 'stake-1'
  },
  {
    id: 'claim-2',
    airdropId: 'plasma-chain',
    projectName: 'Plasma',
    tokenSymbol: '$XPL',
    tokenIcon: '/logos/plasma.jpg',
    chainName: 'Plasma',
    claimedAmount: 150,
    claimDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    txHash: '0x1234...5678',
    wasStaked: true,
    stakingPositionId: 'stake-2'
  },
  {
    id: 'claim-3',
    airdropId: 'allora-cosmos',
    projectName: 'Allora Network',
    tokenSymbol: '$ALLO',
    tokenIcon: '/logos/allora.png',
    chainName: 'COSMOS L1',
    claimedAmount: 230,
    claimDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    txHash: '0x2234...5679',
    wasStaked: true,
    stakingPositionId: 'stake-3'
  }
]

export const useStakingDashboard = () => {
  const [stakingData, setStakingData] = useState<StakingDashboardData>({
    totalStakedValue: 0,
    totalPendingRewards: 0,
    activePositions: [],
    unlockedPositions: [],
    claimHistory: []
  })

  const [isLoading, setIsLoading] = useState(true)

  // Calculate time remaining for unlock
  const getTimeRemaining = useCallback((unlockDate: Date) => {
    const now = new Date()
    const difference = unlockDate.getTime() - now.getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, isUnlocked: true }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

    return { days, hours, minutes, isUnlocked: false }
  }, [])

  // Load staking data
  const loadStakingData = useCallback(async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update positions status based on current time
    const updatedPositions = mockStakedPositions.map(position => {
      const timeRemaining = getTimeRemaining(position.unlockDate)
      return {
        ...position,
        status: timeRemaining.isUnlocked ? 'unlocked' as const : 'locked' as const
      }
    })

    const activePositions = updatedPositions.filter(p => p.status === 'locked')
    const unlockedPositions = updatedPositions.filter(p => p.status === 'unlocked')

    const totalStakedValue = activePositions.reduce((sum, pos) => sum + pos.stakedAmount, 0)
    const totalPendingRewards = activePositions.reduce((sum, pos) => sum + pos.accruedRewards, 0)

    setStakingData({
      totalStakedValue,
      totalPendingRewards,
      activePositions,
      unlockedPositions,
      claimHistory: mockClaimHistory
    })

    setIsLoading(false)
  }, [getTimeRemaining])

  // Claim unlocked rewards
  const claimRewards = useCallback(async (positionId: string) => {
    const position = stakingData.unlockedPositions.find(p => p.id === positionId)
    if (!position) return false

    // Simulate claiming
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Update position status
    setStakingData(prev => ({
      ...prev,
      unlockedPositions: prev.unlockedPositions.filter(p => p.id !== positionId),
      claimHistory: [
        {
          id: `reward-claim-${Date.now()}`,
          airdropId: position.airdropId,
          projectName: position.projectName,
          tokenSymbol: position.tokenSymbol,
          tokenIcon: position.tokenIcon,
          chainName: position.chainName,
          claimedAmount: position.stakedAmount + position.estimatedRewards,
          claimDate: new Date(),
          txHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
          wasStaked: true,
          stakingPositionId: positionId
        },
        ...prev.claimHistory
      ]
    }))

    return true
  }, [stakingData.unlockedPositions])

  useEffect(() => {
    loadStakingData()
  }, [loadStakingData])

  // Update accrued rewards periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStakingData(prev => ({
        ...prev,
        activePositions: prev.activePositions.map(position => {
          // Simple accrued rewards calculation (for demo)
          const dailyReward = (position.stakedAmount * position.stakingApr / 100) / 365
          const daysStaked = Math.floor((Date.now() - position.stakingStartDate.getTime()) / (1000 * 60 * 60 * 24))
          const newAccruedRewards = Math.min(dailyReward * daysStaked, position.estimatedRewards)

          return {
            ...position,
            accruedRewards: Math.round(newAccruedRewards * 100) / 100
          }
        })
      }))
    }, 5000) // Update every 5 seconds for demo

    return () => clearInterval(interval)
  }, [])

  return {
    stakingData,
    isLoading,
    getTimeRemaining,
    claimRewards,
    refreshData: loadStakingData
  }
}