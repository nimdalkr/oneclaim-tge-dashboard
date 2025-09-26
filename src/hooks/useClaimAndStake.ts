'use client'

import { useState, useCallback } from 'react'
import { ClaimAndStakeState, StakingDecision, ClaimAndStakeResult } from '@/types'
import { MockAirdrop, simulateClaimAndStaking, calculateStakingRewards } from '@/data/mockAirdrops'

export const useClaimAndStake = () => {
  const [state, setState] = useState<ClaimAndStakeState>({
    selectedAirdrops: [],
    stakingDecisions: [],
    isProcessing: false,
    results: []
  })

  const toggleAirdropSelection = useCallback((airdropId: string) => {
    setState(prev => ({
      ...prev,
      selectedAirdrops: prev.selectedAirdrops.includes(airdropId)
        ? prev.selectedAirdrops.filter(id => id !== airdropId)
        : [...prev.selectedAirdrops, airdropId]
    }))
  }, [])

  const updateStakingDecision = useCallback((
    airdropId: string,
    willStake: boolean,
    duration?: '1M' | '3M' | '6M',
    apr?: number,
    tokenAmount?: number
  ) => {
    setState(prev => {
      const existingIndex = prev.stakingDecisions.findIndex(d => d.airdropId === airdropId)
      const newStakingDecisions = [...prev.stakingDecisions]

      if (willStake && duration && apr !== undefined && tokenAmount !== undefined) {
        const estimatedRewards = calculateStakingRewards(tokenAmount, apr, duration)
        const newDecision: StakingDecision = {
          airdropId,
          willStake: true,
          duration,
          apr,
          estimatedRewards
        }

        if (existingIndex >= 0) {
          newStakingDecisions[existingIndex] = newDecision
        } else {
          newStakingDecisions.push(newDecision)
        }
      } else if (!willStake) {
        if (existingIndex >= 0) {
          newStakingDecisions[existingIndex] = { airdropId, willStake: false }
        } else {
          newStakingDecisions.push({ airdropId, willStake: false })
        }
      }

      return {
        ...prev,
        stakingDecisions: newStakingDecisions
      }
    })
  }, [])

  const processClaimAndStake = useCallback(async (airdrops: MockAirdrop[]): Promise<ClaimAndStakeResult[]> => {
    setState(prev => ({ ...prev, isProcessing: true, results: [] }))

    try {
      const selectedAirdropsData = airdrops.filter(a => state.selectedAirdrops.includes(a.id) && a.claimable)

      // Simulate the claim and staking process
      const simulationResult = await simulateClaimAndStaking(selectedAirdropsData, state.stakingDecisions)

      const results: ClaimAndStakeResult[] = selectedAirdropsData.map(airdrop => {
        const stakingDecision = state.stakingDecisions.find(d => d.airdropId === airdrop.id)

        return {
          airdropId: airdrop.id,
          success: simulationResult.success,
          claimed: true,
          staked: stakingDecision?.willStake || false,
          txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
        }
      })

      setState(prev => ({
        ...prev,
        isProcessing: false,
        results
      }))

      return results
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        results: []
      }))
      throw error
    }
  }, [state.selectedAirdrops, state.stakingDecisions])

  const reset = useCallback(() => {
    setState({
      selectedAirdrops: [],
      stakingDecisions: [],
      isProcessing: false,
      results: []
    })
  }, [])

  return {
    ...state,
    toggleAirdropSelection,
    updateStakingDecision,
    processClaimAndStake,
    reset
  }
}