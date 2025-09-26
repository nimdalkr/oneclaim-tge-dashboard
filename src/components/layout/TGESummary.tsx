'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp, Coins, Target, Gift, Clock, Percent } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { TGESummaryData } from '@/types'
import { MockAirdrop } from '@/data/mockAirdrops'
import { formatTokenAmount, getDurationDisplay } from '@/lib/tgeUtils'

interface TGESummaryProps {
  summaryData: TGESummaryData
  airdrops: MockAirdrop[]
}

export const TGESummary = ({ summaryData, airdrops }: TGESummaryProps) => {
  const {
    totalClaimableTokens,
    totalStakingDecisions,
    estimatedTotalRewards,
    selectedAirdrops,
    stakingDecisions
  } = summaryData

  const selectedAirdropsData = airdrops.filter(a => selectedAirdrops.includes(a.id) && a.claimable)

  if (totalClaimableTokens === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="text-center p-8 bg-zinc-900 border-zinc-800">
          <div className="text-zinc-600 mb-4">
            <Gift className="w-16 h-16 mx-auto opacity-30" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-2">
            No Claimable TGE Tokens Available
          </h3>
          <p className="text-sm text-zinc-500">
            Connect your wallet and check for available TGE tokens to claim.
          </p>
        </Card>
      </motion.div>
    )
  }

  const summaryItems = [
    {
      icon: Gift,
      label: 'Claimable Tokens',
      value: `${totalClaimableTokens}`,

      color: 'text-enso-cyan',
      bgColor: 'bg-zinc-800 border-zinc-700'
    },
    {
      icon: Coins,
      label: 'Selected Tokens',
      value: `${selectedAirdropsData.length}`,

      color: 'text-enso-purple',
      bgColor: 'bg-zinc-800 border-zinc-700'
    },
    {
      icon: Target,
      label: 'Staking Plans',
      value: `${totalStakingDecisions}`,

      color: 'text-yellow-400',
      bgColor: 'bg-zinc-800 border-zinc-700'
    },
    {
      icon: TrendingUp,
      label: 'Est. Total Rewards',
      value: `+${estimatedTotalRewards.toLocaleString()}`,
      color: 'text-green-400',
      bgColor: 'bg-zinc-800 border-zinc-700'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <TrendingUp className="w-5 h-5 text-enso-cyan" />
            TGE Claim & Staking Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {summaryItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg ${item.bgColor} border`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-sm font-medium text-zinc-300">
                      {item.label}
                    </span>
                  </div>
                </div>
                <div className={`text-xl font-bold mt-1 ${item.color}`}>
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 선택된 토큰 목록 */}
          {selectedAirdropsData.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="border-t border-zinc-800 pt-4 space-y-4"
            >
              <h4 className="font-medium text-zinc-300 mb-3">
                Selected Tokens ({selectedAirdropsData.length})
              </h4>
              <div className="space-y-3">
                {selectedAirdropsData.map((airdrop) => {
                  const stakingDecision = stakingDecisions.find(d => d.airdropId === airdrop.id)
                  return (
                    <div
                      key={airdrop.id}
                      className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {airdrop.tokenIcon?.startsWith('/') ? (
                            <Image
                              src={airdrop.tokenIcon}
                              alt={airdrop.token}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                          ) : (
                            <span className="text-lg">{airdrop.tokenIcon}</span>
                          )}
                          <span className="font-semibold text-zinc-100">
                            {formatTokenAmount(airdrop.amount, airdrop.token)}
                          </span>
                          <span className="text-xs text-zinc-400">from {airdrop.chain}</span>
                        </div>
                        <div className="text-xs text-zinc-400">To be claimed</div>
                      </div>

                      {stakingDecision?.willStake && stakingDecision.duration && (
                        <div className="flex items-center justify-between text-xs bg-zinc-700/50 rounded p-2 mt-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-enso-purple" />
                            <span className="text-zinc-300">
                              {getDurationDisplay(stakingDecision.duration)} staking
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Percent className="w-3 h-3 text-yellow-400" />
                              <span className="text-yellow-400">{stakingDecision.apr}% APR</span>
                            </div>
                            <div className="text-green-400 font-medium">
                              +{stakingDecision.estimatedRewards?.toLocaleString()} {airdrop.token}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {selectedAirdrops.length === 0 && totalClaimableTokens > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4 border-t border-zinc-800"
            >
              <p className="text-sm text-zinc-400">
                Please select TGE tokens to claim
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}