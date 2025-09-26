'use client'

import { useState, useEffect, useCallback } from 'react'
import { WalletState } from '@/types'
import { MOCK_WALLET_ADDRESS } from '@/data/mockData'
import { walletStore } from '@/lib/walletStore'

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>(walletStore.getState())

  useEffect(() => {
    const unsubscribe = walletStore.subscribe(setWalletState)
    return unsubscribe
  }, [])

  const connectWallet = useCallback(async () => {
    walletStore.setState({ isConnecting: true })

    // 실제 지갑 연결을 모방하는 지연
    await new Promise(resolve => setTimeout(resolve, 1500))

    walletStore.setState({
      isConnected: true,
      address: MOCK_WALLET_ADDRESS,
      isConnecting: false,
    })
  }, [])

  const disconnectWallet = useCallback(() => {
    walletStore.setState({
      isConnected: false,
      address: null,
      isConnecting: false,
    })
  }, [])

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
  }
}