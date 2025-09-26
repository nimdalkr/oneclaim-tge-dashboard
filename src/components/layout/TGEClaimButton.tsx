'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Check, X, ExternalLink, AlertCircle, Target, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ClaimAndStakeResult } from '@/types'
import { MockAirdrop } from '@/data/mockAirdrops'

interface TGEClaimButtonProps {
  selectedAirdrops: string[]
  airdrops: MockAirdrop[]
  stakingCount: number
  isWalletConnected: boolean
  isProcessing: boolean
  onClaim: () => Promise<ClaimAndStakeResult[]>
  onShowToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void
}

export const TGEClaimButton = ({
  selectedAirdrops,
  airdrops,
  stakingCount,
  isWalletConnected,
  isProcessing,
  onClaim,
  onShowToast
}: TGEClaimButtonProps) => {
  const [results, setResults] = useState<ClaimAndStakeResult[]>([])
  const [showResults, setShowResults] = useState(false)

  const selectedAirdropsData = airdrops.filter(a => selectedAirdrops.includes(a.id) && a.claimable)

  const handleClaim = async () => {
    try {
      const claimResults = await onClaim()
      setResults(claimResults)
      setShowResults(true)

      const successCount = claimResults.filter(r => r.success).length
      const failCount = claimResults.length - successCount
      const stakedCount = claimResults.filter(r => r.staked).length

      if (successCount > 0 && failCount === 0) {
        const message = stakedCount > 0
          ? `🎉 ${successCount} TGE tokens claimed successfully! ${stakedCount} are immediately staked.`
          : `🎉 ${successCount} TGE tokens claimed successfully!`
        onShowToast('success', message)
      } else if (successCount > 0 && failCount > 0) {
        onShowToast('info', 'Partial claim completed', `Success: ${successCount}, Failed: ${failCount}${stakedCount > 0 ? `, Staked: ${stakedCount}` : ''}`)
      } else {
        onShowToast('error', 'All claims failed', 'Please try again')
      }

      // 결과를 7초 후에 숨김
      setTimeout(() => {
        setShowResults(false)
      }, 7000)
    } catch (error) {
      onShowToast('error', 'An error occurred during claim processing', error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const isDisabled = !isWalletConnected || selectedAirdrops.length === 0 || isProcessing

  const getButtonText = () => {
    if (isProcessing) {
      return `Processing... (${selectedAirdrops.length} tokens)`
    }
    if (!isWalletConnected) {
      return 'Please connect your wallet first'
    }
    if (selectedAirdrops.length === 0) {
      return 'Please select TGE tokens'
    }

    if (stakingCount > 0) {
      return `Claim All & Stake ${stakingCount}`
    }
    return `Claim All (${selectedAirdrops.length})`
  }

  return (
    <div className="space-y-4">
      {/* 클레임 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={handleClaim}
          disabled={isDisabled}
          isLoading={isProcessing}
          size="lg"
          className={`w-full h-16 text-lg font-bold transition-all duration-300 ${
            !isDisabled
              ? 'enso-gradient hover:enso-gradient-hover animate-pulse-glow enso-glow-hover text-white shadow-xl'
              : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
          }`}
        >
          <Zap className="w-6 h-6 mr-2" />
          {getButtonText()}
        </Button>

        {/* 버튼 하단 정보 */}
        <AnimatePresence>
          {!isWalletConnected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-center gap-2 text-sm text-zinc-400 mt-2"
            >
              <AlertCircle className="w-4 h-4" />
              Connect your wallet to start claiming TGE tokens
            </motion.div>
          )}
          {isWalletConnected && selectedAirdropsData.length > 0 && stakingCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-center gap-2 text-sm text-enso-purple mt-2"
            >
              <Target className="w-4 h-4" />
              {stakingCount} of selected tokens will be staked immediately after claim
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 클레임 결과 */}
      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-zinc-700 bg-zinc-900">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-zinc-100">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  TGE Claim & Staking Results
                </h3>
                <div className="space-y-3">
                  {results.map((result) => {
                    const airdrop = airdrops.find(a => a.id === result.airdropId)
                    if (!airdrop) return null

                    return (
                      <motion.div
                        key={result.airdropId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`rounded-lg border p-3 ${
                          result.success
                            ? 'bg-green-900/20 border-green-700/50'
                            : 'bg-red-900/20 border-red-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {result.success ? (
                                <Check className="w-5 h-5 text-green-400" />
                              ) : (
                                <X className="w-5 h-5 text-red-400" />
                              )}
                              {airdrop.tokenIcon?.startsWith('/') ? (
                                <Image
                                  src={airdrop.tokenIcon}
                                  alt={airdrop.token}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                              ) : (
                                <span className="text-lg">{airdrop.tokenIcon}</span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-zinc-100">
                                  {airdrop.amount.toLocaleString()} {airdrop.token}
                                </span>
                                <span className="text-xs text-zinc-400">
                                  from {airdrop.chain}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                {result.claimed && (
                                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">
                                    Claimed
                                  </span>
                                )}
                                {result.staked && (
                                  <span className="text-xs bg-enso-purple/20 text-enso-purple px-2 py-0.5 rounded">
                                    Staked
                                  </span>
                                )}
                              </div>
                              {result.error && (
                                <p className="text-sm text-red-400 mt-1">{result.error}</p>
                              )}
                            </div>
                          </div>
                          {result.success && result.txHash && (
                            <div className="flex items-center gap-1 text-sm text-enso-cyan hover:text-enso-pink cursor-pointer transition-colors">
                              <ExternalLink className="w-4 h-4" />
                              <span className="font-mono text-xs">{result.txHash}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}