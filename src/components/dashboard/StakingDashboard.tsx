'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, TrendingUp, Award, Calendar, ExternalLink, Unlock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useStakingDashboard } from '@/hooks/useStakingDashboard'
import { StakedPosition } from '@/types'

const TimeRemaining = ({ position }: { position: StakedPosition }) => {
  const { getTimeRemaining } = useStakingDashboard()
  const timeRemaining = getTimeRemaining(position.unlockDate)

  if (timeRemaining.isUnlocked) {
    return (
      <div className="flex items-center gap-1 text-green-400">
        <Unlock className="w-4 h-4" />
        <span className="text-sm font-medium">Unlocked</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4 text-enso-cyan" />
      <div className="text-sm">
        <span className="font-medium text-zinc-100">
          {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
        </span>
        <div className="text-xs text-zinc-400">until unlock</div>
      </div>
    </div>
  )
}

const StakingPositionCard = ({ position, onClaim }: { position: StakedPosition; onClaim?: (id: string) => void }) => {
  const isUnlocked = position.status === 'unlocked'
  const progressPercentage = Math.min((position.accruedRewards / position.estimatedRewards) * 100, 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className={`bg-zinc-900 border-zinc-800 ${isUnlocked ? 'ring-2 ring-green-500/50' : ''}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {position.tokenIcon?.startsWith('/') ? (
                  <Image
                    src={position.tokenIcon}
                    alt={position.tokenSymbol}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-2xl">{position.tokenIcon}</span>
                )}
                <div>
                  <h3 className="font-bold text-lg text-zinc-100">{position.projectName}</h3>
                  <p className="text-sm text-zinc-400">{position.chainName}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-zinc-100">
                {position.stakedAmount.toLocaleString()}
              </div>
              <div className="text-sm text-zinc-400">staked</div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Lock Duration and APR */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-enso-purple" />
                <span className="text-sm text-zinc-300">{position.lockDuration} Lock</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">{position.stakingApr}% APR</span>
              </div>
            </div>

            {/* Time Remaining */}
            <div className="flex justify-between items-center">
              <TimeRemaining position={position} />
              {isUnlocked && onClaim && (
                <Button
                  onClick={() => onClaim(position.id)}
                  size="sm"
                  className="enso-gradient hover:enso-gradient-hover text-white"
                >
                  <Award className="w-4 h-4 mr-1" />
                  Claim Rewards
                </Button>
              )}
            </div>

            {/* Rewards Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Rewards Progress</span>
                <span className="text-zinc-300">
                  {position.accruedRewards.toFixed(2)} / {position.estimatedRewards.toFixed(2)} {position.tokenSymbol}
                </span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-2 enso-gradient rounded-full"
                />
              </div>
              <div className="text-xs text-zinc-500">
                {progressPercentage.toFixed(1)}% of estimated rewards earned
              </div>
            </div>

            {/* Expected Total Return */}
            <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Total Expected Return</span>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-400">
                    {(position.stakedAmount + position.estimatedRewards).toFixed(2)} {position.tokenSymbol}
                  </div>
                  <div className="text-xs text-zinc-500">
                    +{position.estimatedRewards.toFixed(2)} rewards
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const ClaimHistoryItem = ({ claim }: { claim: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50"
    >
      <div className="flex items-center gap-3">
        {claim.tokenIcon?.startsWith('/') ? (
          <Image
            src={claim.tokenIcon}
            alt={claim.tokenSymbol}
            width={24}
            height={24}
            className="rounded-full"
          />
        ) : (
          <span className="text-xl">{claim.tokenIcon}</span>
        )}
        <div>
          <div className="font-medium text-zinc-100">
            {claim.claimedAmount.toLocaleString()} {claim.tokenSymbol}
          </div>
          <div className="text-sm text-zinc-400">{claim.chainName}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-zinc-300">
          {claim.claimDate.toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1 text-xs text-enso-cyan">
          <ExternalLink className="w-3 h-3" />
          {claim.txHash}
        </div>
      </div>
    </motion.div>
  )
}

export const StakingDashboard = () => {
  const { stakingData, isLoading, claimRewards } = useStakingDashboard()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-enso-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const hasActivePositions = stakingData.activePositions.length > 0
  const hasUnlockedPositions = stakingData.unlockedPositions.length > 0
  const hasClaimHistory = stakingData.claimHistory.length > 0

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 enso-gradient rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-zinc-100">
                  {stakingData.totalStakedValue.toLocaleString()}
                </div>
                <div className="text-sm text-zinc-400">Total Staked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-900/30 border border-green-700/50 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  +{stakingData.totalPendingRewards.toFixed(2)}
                </div>
                <div className="text-sm text-zinc-400">Pending Rewards</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-enso-purple/20 border border-enso-purple/50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-enso-purple" />
              </div>
              <div>
                <div className="text-2xl font-bold text-zinc-100">
                  {stakingData.activePositions.length}
                </div>
                <div className="text-sm text-zinc-400">Active Positions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Unlocked Positions */}
      {hasUnlockedPositions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-2xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Unlock className="w-6 h-6 text-green-400" />
            Unlocked Positions - Ready to Claim!
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {stakingData.unlockedPositions.map((position) => (
              <StakingPositionCard
                key={position.id}
                position={position}
                onClaim={claimRewards}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Active Staking Positions */}
      {hasActivePositions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-enso-cyan" />
            Active Staking Positions
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {stakingData.activePositions.map((position) => (
              <StakingPositionCard key={position.id} position={position} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Claim History */}
      {hasClaimHistory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-zinc-100">
                <Award className="w-5 h-5 text-enso-purple" />
                Claim History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stakingData.claimHistory.slice(0, 5).map((claim) => (
                  <ClaimHistoryItem key={claim.id} claim={claim} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {!hasActivePositions && !hasUnlockedPositions && !hasClaimHistory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-zinc-800 rounded-full flex items-center justify-center">
            <TrendingUp className="w-12 h-12 text-zinc-600" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-300 mb-2">
            No Staking Positions Yet
          </h3>
          <p className="text-zinc-500">
            Claim some TGE tokens and stake them to see your positions here.
          </p>
        </motion.div>
      )}
    </div>
  )
}