'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { WalletConnect } from '@/components/layout/WalletConnect'
import { TGEAirdropCard } from '@/components/layout/TGEAirdropCard'
import { TGESummary } from '@/components/layout/TGESummary'
import { TGEClaimButton } from '@/components/layout/TGEClaimButton'
import { StakingDashboard } from '@/components/dashboard/StakingDashboard'
import { AirdropActivityDashboard } from '@/components/dashboard/AirdropActivityDashboard'
import { ToastContainer } from '@/components/ui/Toast'
import { useWallet } from '@/hooks/useWallet'
import { useClaimAndStake } from '@/hooks/useClaimAndStake'
import { useToast } from '@/hooks/useToast'
import { mockAirdrops } from '@/data/mockAirdrops'
import { calculateTGESummary } from '@/lib/tgeUtils'

function ClaimBoardContent() {
  const [activeTab, setActiveTab] = useState<'tge' | 'activity' | 'staking'>('tge')
  const { isConnected } = useWallet()
  const {
    selectedAirdrops,
    stakingDecisions,
    isProcessing,
    toggleAirdropSelection,
    updateStakingDecision,
    processClaimAndStake
  } = useClaimAndStake()
  const { toasts, showToast, removeToast } = useToast()

  const summaryData = calculateTGESummary(mockAirdrops, selectedAirdrops, stakingDecisions)
  const stakingCount = stakingDecisions.filter(d => d.willStake && selectedAirdrops.includes(d.airdropId)).length

  const handleClaimAll = async () => {
    try {
      return await processClaimAndStake(mockAirdrops)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 enso-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <h1 className="text-2xl font-bold enso-text-gradient">
                OneClaim
              </h1>
            </motion.div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-zinc-100 mb-4">
            One Click. One Flow. One Intent.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Claim and Stake Your TGE Airdrops via Enso
          </p>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto mt-4">
            Seamlessly manage TGE token claims and staking across multiple chains.
            Powered by Enso's intelligent routing for optimal yield strategies.
          </p>
        </motion.div>

        {isConnected ? (
          <div className="space-y-8">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="flex bg-zinc-800/50 rounded-lg p-1 border border-zinc-700">
                <button
                  onClick={() => setActiveTab('tge')}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'tge'
                      ? 'enso-gradient text-white shadow-lg'
                      : 'text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  TGE Tokens
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'activity'
                      ? 'enso-gradient text-white shadow-lg'
                      : 'text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  Activity Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('staking')}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'staking'
                      ? 'enso-gradient text-white shadow-lg'
                      : 'text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  Staking Positions
                </button>
              </div>
            </motion.div>

            {/* Tab Content */}
            {activeTab === 'tge' && (
              <motion.div
                key="tge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* TGE Token Cards Grid */}
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-100 mb-6">
                    Available TGE Tokens
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {mockAirdrops.map((airdrop) => {
                      const stakingDecision = stakingDecisions.find(d => d.airdropId === airdrop.id)

                      return (
                        <TGEAirdropCard
                          key={airdrop.id}
                          airdrop={airdrop}
                          isSelected={selectedAirdrops.includes(airdrop.id)}
                          stakingDecision={stakingDecision}
                          onSelectionChange={toggleAirdropSelection}
                          onStakingChange={updateStakingDecision}
                          disabled={isProcessing}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Summary and Claim Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <TGESummary summaryData={summaryData} airdrops={mockAirdrops} />
                  </motion.div>

                  {/* Claim Button */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start"
                  >
                    <div className="w-full">
                      <TGEClaimButton
                        selectedAirdrops={selectedAirdrops}
                        airdrops={mockAirdrops}
                        stakingCount={stakingCount}
                        isWalletConnected={isConnected}
                        isProcessing={isProcessing}
                        onClaim={handleClaimAll}
                        onShowToast={showToast}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* TGE Statistics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-zinc-900 rounded-lg border border-zinc-800 p-6"
                >
                  <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                    📊 TGE Token Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                      <div className="text-2xl font-bold text-enso-cyan">4</div>
                      <div className="text-sm text-zinc-300">Supported Projects</div>
                    </div>
                    <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                      <div className="text-2xl font-bold text-green-400">3</div>
                      <div className="text-sm text-zinc-300">Claimable</div>
                    </div>
                    <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                      <div className="text-2xl font-bold text-enso-purple">465</div>
                      <div className="text-sm text-zinc-300">Total Token Amount</div>
                    </div>
                    <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                      <div className="text-2xl font-bold text-enso-pink">18%</div>
                      <div className="text-sm text-zinc-300">Highest APR</div>
                    </div>
                  </div>
                </motion.div>

                {/* What is TGE Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-zinc-900 rounded-lg border border-zinc-800 p-6"
                >
                  <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                    💡 What is TGE (Token Generation Event)?
                  </h3>
                  <div className="text-sm text-zinc-400 space-y-3">
                    <p>
                      TGE is an event where new cryptocurrency projects issue and distribute tokens for the first time.
                      It provides a special opportunity to receive tokens before they are listed on exchanges.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <div className="text-enso-cyan font-medium mb-1">Early Access</div>
                        <div className="text-xs">Acquire tokens before exchange listing</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <div className="text-enso-purple font-medium mb-1">Staking Rewards</div>
                        <div className="text-xs">Immediate staking available after claim</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <div className="text-enso-pink font-medium mb-1">High Profitability</div>
                        <div className="text-xs">Up to 18% APR staking rewards</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AirdropActivityDashboard />
              </motion.div>
            )}

            {activeTab === 'staking' && (
              <motion.div
                key="staking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <StakingDashboard />
              </motion.div>
            )}
          </div>
        ) : (
          /* Not Connected State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 enso-gradient rounded-full flex items-center justify-center enso-glow">
              <span className="text-white text-4xl">🚀</span>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-100 mb-4">
              Please Connect Your Wallet
            </h3>
            <p className="text-zinc-400 max-w-md mx-auto mb-8">
              Connect your wallet to experience seamless TGE claiming and staking via Enso.
              One click to claim, one flow to stake, one intent to maximize yield.
            </p>
            <div className="flex justify-center">
              <WalletConnect />
            </div>
          </motion.div>
        )}
      </main>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-zinc-400 text-sm">
              🚀 OneClaim - One Click. One Flow. One Intent.
            </p>
            <p className="text-zinc-500 text-xs mt-2">
              This project is created for demo purposes and is not connected to actual blockchains.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function ClaimBoard() {
  return <ClaimBoardContent />
}