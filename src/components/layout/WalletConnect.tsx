'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WalletModal } from '@/components/ui/WalletModal'
import { useWallet } from '@/hooks/useWallet'

export const WalletConnect = () => {
  const [showModal, setShowModal] = useState(false)
  const { isConnected, address, isConnecting, connectWallet, disconnectWallet } = useWallet()

  if (isConnected && address) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 bg-zinc-800/90 backdrop-blur-sm border border-green-700/50 rounded-lg px-4 py-2"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-zinc-100">
          {address}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={disconnectWallet}
          className="text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </motion.div>
    )
  }

  const handleConnect = (walletId: string) => {
    connectWallet()
    setShowModal(false)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          onClick={handleOpenModal}
          isLoading={isConnecting}
          className="enso-gradient hover:enso-gradient-hover text-white shadow-lg enso-glow-hover transition-all duration-300"
        >
          <Wallet className="w-5 h-5 mr-2" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </motion.div>

      <WalletModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConnect={handleConnect}
        isConnecting={isConnecting}
      />
    </>
  )
}