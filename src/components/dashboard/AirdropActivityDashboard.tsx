'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Wallet,
  TrendingUp,
  Coins,
  DollarSign,
  Clock,
  Award,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface WalletConnection {
  id: string
  address: string
  nickname: string
  isConnected: boolean
  totalClaimedValue: number
  totalStakedValue: number
  totalPendingRewards: number
  activePositions: number
}

interface TokenValue {
  tokenSymbol: string
  projectName: string
  tokenIcon: string
  currentPrice: number
  amount: number
  value: number
  change24h: number
}

interface AirdropSummary {
  totalWallets: number
  totalClaimedValue: number
  totalStakedValue: number
  totalPendingRewards: number
  totalActivePositions: number
  portfolioValue: number
  portfolioChange24h: number
}

const mockWallets: WalletConnection[] = [
  {
    id: 'wallet-1',
    address: '0x1234...5678',
    nickname: 'Main Wallet',
    isConnected: true,
    totalClaimedValue: 25400,
    totalStakedValue: 18200,
    totalPendingRewards: 850,
    activePositions: 3
  },
  {
    id: 'wallet-2',
    address: '0x8765...4321',
    nickname: 'DeFi Wallet',
    isConnected: false,
    totalClaimedValue: 12300,
    totalStakedValue: 8900,
    totalPendingRewards: 420,
    activePositions: 2
  },
  {
    id: 'wallet-3',
    address: '0xabcd...efgh',
    nickname: 'Gaming Wallet',
    isConnected: true,
    totalClaimedValue: 8900,
    totalStakedValue: 6500,
    totalPendingRewards: 280,
    activePositions: 1
  }
]

const mockTokenValues: TokenValue[] = [
  {
    tokenSymbol: '$ENSO',
    projectName: 'ENSO',
    tokenIcon: '/logos/enso.jpg',
    currentPrice: 2.45,
    amount: 585,
    value: 1433.25,
    change24h: 12.5
  },
  {
    tokenSymbol: '$XPL',
    projectName: 'Plasma',
    tokenIcon: '/logos/plasma.jpg',
    currentPrice: 0.85,
    amount: 650,
    value: 552.50,
    change24h: -3.2
  },
  {
    tokenSymbol: '$ALLO',
    projectName: 'Allora Network',
    tokenIcon: '/logos/allora.png',
    currentPrice: 1.20,
    amount: 460,
    value: 552.00,
    change24h: 8.7
  },
  {
    tokenSymbol: '$SEA',
    projectName: 'Opensea',
    tokenIcon: '🌊',
    currentPrice: 15.80,
    amount: 120,
    value: 1896.00,
    change24h: 5.4
  }
]

export const AirdropActivityDashboard = () => {
  const [showValues, setShowValues] = useState(true)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  // Calculate summary data
  const summary: AirdropSummary = {
    totalWallets: mockWallets.length,
    totalClaimedValue: mockWallets.reduce((sum, w) => sum + w.totalClaimedValue, 0),
    totalStakedValue: mockWallets.reduce((sum, w) => sum + w.totalStakedValue, 0),
    totalPendingRewards: mockWallets.reduce((sum, w) => sum + w.totalPendingRewards, 0),
    totalActivePositions: mockWallets.reduce((sum, w) => sum + w.activePositions, 0),
    portfolioValue: mockTokenValues.reduce((sum, t) => sum + t.value, 0),
    portfolioChange24h: 7.2
  }

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-zinc-100">Airdrop Activity Dashboard</h2>
          <Button
            onClick={() => setShowValues(!showValues)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            {showValues ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showValues ? 'Hide Values' : 'Show Values'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex items-center h-full">
              <div className="flex items-center gap-3 w-full">
                <div className="w-12 h-12 enso-gradient rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-zinc-100">
                    {showValues ? `$${summary.portfolioValue.toLocaleString()}` : '****'}
                  </div>
                  <div className="text-sm text-zinc-400">Total Portfolio</div>
                  <div className={`text-xs ${summary.portfolioChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {summary.portfolioChange24h >= 0 ? '+' : ''}{summary.portfolioChange24h}% (24h)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex items-center h-full">
              <div className="flex items-center gap-3 w-full">
                <div className="w-12 h-12 bg-green-900/30 border border-green-700/50 rounded-lg flex items-center justify-center">
                  <Coins className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-zinc-100">
                    {showValues ? `$${summary.totalClaimedValue.toLocaleString()}` : '****'}
                  </div>
                  <div className="text-sm text-zinc-400">Total Claimed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex items-center h-full">
              <div className="flex items-center gap-3 w-full">
                <div className="w-12 h-12 bg-enso-purple/20 border border-enso-purple/50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-enso-purple" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-zinc-100">
                    {showValues ? `$${summary.totalStakedValue.toLocaleString()}` : '****'}
                  </div>
                  <div className="text-sm text-zinc-400">Total Staked</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex items-center h-full">
              <div className="flex items-center gap-3 w-full">
                <div className="w-12 h-12 bg-yellow-900/30 border border-yellow-700/50 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-zinc-100">
                    {showValues ? `$${summary.totalPendingRewards.toLocaleString()}` : '****'}
                  </div>
                  <div className="text-sm text-zinc-400">Pending Rewards</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Connected Wallets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-enso-cyan" />
                  Connected Wallets ({mockWallets.filter(w => w.isConnected).length}/{mockWallets.length})
                </div>
                <Button size="sm" className="enso-gradient">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Wallet
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWallets.map((wallet) => (
                  <motion.div
                    key={wallet.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      wallet.isConnected
                        ? 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600'
                        : 'bg-zinc-800/30 border-zinc-800 opacity-60'
                    } ${selectedWallet === wallet.id ? 'ring-2 ring-enso-cyan' : ''}`}
                    onClick={() => setSelectedWallet(selectedWallet === wallet.id ? null : wallet.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          wallet.isConnected ? 'bg-green-400' : 'bg-zinc-600'
                        }`} />
                        <div>
                          <div className="font-medium text-zinc-100">{wallet.nickname}</div>
                          <div className="text-sm text-zinc-400 font-mono">{wallet.address}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-zinc-100">
                          {showValues ? `$${wallet.totalClaimedValue.toLocaleString()}` : '****'}
                        </div>
                        <div className="text-xs text-zinc-400">
                          {wallet.activePositions} positions
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Token Holdings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-enso-purple" />
                Token Holdings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTokenValues.map((token) => (
                  <motion.div
                    key={token.tokenSymbol}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-enso-cyan to-enso-purple">
                          {token.tokenIcon.startsWith('/') ? (
                            <Image
                              src={token.tokenIcon}
                              alt={token.projectName}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-lg">{token.tokenIcon}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-zinc-100">{token.projectName}</div>
                          <div className="text-sm text-zinc-400">
                            {showValues ? `${token.amount.toLocaleString()} ${token.tokenSymbol}` : '*** tokens'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-zinc-100">
                          {showValues ? `$${token.value.toLocaleString()}` : '****'}
                        </div>
                        <div className={`text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}