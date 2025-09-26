'use client'

import { useState, useCallback } from 'react'
import { ClaimState, ClaimResult } from '@/types'
import { simulateClaimDelay, generateMockTxHash } from '@/data/mockData'

export const useClaim = () => {
  const [claimState, setClaimState] = useState<ClaimState>({
    selectedChains: [],
    isProcessing: false,
    results: []
  })

  const updateSelectedChains = useCallback((chainId: string, selected: boolean) => {
    setClaimState(prev => ({
      ...prev,
      selectedChains: selected
        ? [...prev.selectedChains, chainId]
        : prev.selectedChains.filter(id => id !== chainId)
    }))
  }, [])

  const processClaims = useCallback(async (): Promise<ClaimResult[]> => {
    if (claimState.selectedChains.length === 0) {
      throw new Error('선택된 체인이 없습니다')
    }

    setClaimState(prev => ({ ...prev, isProcessing: true, results: [] }))

    try {
      const claimPromises = claimState.selectedChains.map(async (chainId): Promise<ClaimResult> => {
        try {
          const success = await simulateClaimDelay(chainId)

          if (success) {
            return {
              chainId,
              success: true,
              txHash: generateMockTxHash(chainId)
            }
          } else {
            return {
              chainId,
              success: false,
              error: chainId === 'base'
                ? '잔액 부족'
                : '네트워크 오류'
            }
          }
        } catch (error) {
          return {
            chainId,
            success: false,
            error: '예상치 못한 오류가 발생했습니다'
          }
        }
      })

      const results = await Promise.all(claimPromises)

      setClaimState(prev => ({
        ...prev,
        isProcessing: false,
        results
      }))

      return results
    } catch (error) {
      setClaimState(prev => ({
        ...prev,
        isProcessing: false,
        results: []
      }))
      throw error
    }
  }, [claimState.selectedChains])

  const resetClaim = useCallback(() => {
    setClaimState({
      selectedChains: [],
      isProcessing: false,
      results: []
    })
  }, [])

  return {
    ...claimState,
    updateSelectedChains,
    processClaims,
    resetClaim
  }
}