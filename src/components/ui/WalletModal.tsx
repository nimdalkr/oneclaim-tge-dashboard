'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Wallet, Shield, Zap } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'

interface WalletOption {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  popular?: boolean
}

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletId: string) => void
  isConnecting: boolean
}

const walletOptions: WalletOption[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '/logos/metamask.png',
    description: 'Connect to your MetaMask wallet',
    popular: true
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '/logos/walletconnect.png',
    description: 'Scan with WalletConnect to connect'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '/logos/coinbase.png',
    description: 'Connect to Coinbase Wallet'
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '/logos/phantom.png',
    description: 'Connect to your Phantom wallet'
  }
]

export const WalletModal = ({ isOpen, onClose, onConnect, isConnecting }: WalletModalProps) => {
  const handleWalletSelect = (walletId: string) => {
    onConnect(walletId)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Connect Wallet"
    >
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 enso-gradient rounded-full flex items-center justify-center enso-glow">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm text-zinc-400">
            Choose your preferred wallet to connect to OneClaim
          </p>
        </div>

        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <motion.div
              key={wallet.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => handleWalletSelect(wallet.id)}
                disabled={isConnecting}
                className="w-full p-4 h-auto bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-left transition-all duration-200"
                variant="outline"
              >
                <div className="flex items-center gap-4">
                  {typeof wallet.icon === 'string' && wallet.icon.startsWith('/') ? (
                    <Image
                      src={wallet.icon}
                      alt={wallet.name}
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="text-2xl">{wallet.icon}</div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-100">{wallet.name}</span>
                      {wallet.popular && (
                        <span className="px-2 py-0.5 text-xs bg-enso-purple/20 text-enso-purple border border-enso-purple/30 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{wallet.description}</p>
                  </div>
                  {isConnecting && (
                    <div className="w-5 h-5">
                      <div className="w-5 h-5 border-2 border-enso-cyan border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-4 mt-6">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <Shield className="w-4 h-4" />
            <span>Your wallet connection is secure and encrypted</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}