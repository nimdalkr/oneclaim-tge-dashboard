'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, TrendingUp, Clock, Percent } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Checkbox } from '@/components/ui/Checkbox'
import { Switch } from '@/components/ui/Switch'
import { Select } from '@/components/ui/Select'
import { MockAirdrop, StakingDecision, calculateStakingRewards } from '@/data/mockAirdrops'

interface TGEAirdropCardProps {
  airdrop: MockAirdrop
  isSelected: boolean
  stakingDecision?: StakingDecision
  onSelectionChange: (airdropId: string, selected: boolean) => void
  onStakingChange: (
    airdropId: string,
    willStake: boolean,
    duration?: '1M' | '3M' | '6M',
    apr?: number,
    tokenAmount?: number
  ) => void
  disabled?: boolean
}

export const TGEAirdropCard = ({
  airdrop,
  isSelected,
  stakingDecision,
  onSelectionChange,
  onStakingChange,
  disabled = false
}: TGEAirdropCardProps) => {
  const [selectedDuration, setSelectedDuration] = useState<'1M' | '3M' | '6M' | ''>('')
  const [willStake, setWillStake] = useState(stakingDecision?.willStake || false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectionChange(airdrop.id, e.target.checked)
  }

  const handleStakeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWillStake = e.target.checked
    setWillStake(newWillStake)

    if (!newWillStake) {
      setSelectedDuration('')
      onStakingChange(airdrop.id, false)
    } else if (selectedDuration) {
      const option = airdrop.stakingOptions.find(opt => opt.duration === selectedDuration)
      if (option) {
        onStakingChange(airdrop.id, true, selectedDuration, option.apr, airdrop.amount)
      }
    }
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const duration = e.target.value as '1M' | '3M' | '6M' | ''
    setSelectedDuration(duration)

    if (duration && willStake) {
      const option = airdrop.stakingOptions.find(opt => opt.duration === duration)
      if (option) {
        onStakingChange(airdrop.id, true, duration, option.apr, airdrop.amount)
      }
    }
  }

  const selectedOption = airdrop.stakingOptions.find(opt => opt.duration === selectedDuration)
  const estimatedRewards = selectedOption ? calculateStakingRewards(airdrop.amount, selectedOption.apr, selectedDuration as '1M' | '3M' | '6M') : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* ENSO Gradient Border Container */}
      <div
        className={`transition-all duration-300 rounded-lg ${
          isSelected && airdrop.claimable
            ? 'enso-border-gradient p-[1px] enso-glow'
            : 'p-0'
        }`}
      >
        <Card
          className={`transition-all duration-300 bg-zinc-900 border-zinc-800 text-zinc-100 ${
            airdrop.claimable && !disabled
              ? 'hover:shadow-lg cursor-pointer hover:bg-zinc-800/50 enso-glow-hover'
              : 'opacity-75'
          } ${
            isSelected && airdrop.claimable
              ? 'shadow-xl'
              : ''
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {airdrop.tokenIcon?.startsWith('/') ? (
                    <Image
                      src={airdrop.tokenIcon}
                      alt={airdrop.token}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-2xl">{airdrop.tokenIcon}</span>
                  )}
                  <span className="text-lg opacity-50">{airdrop.chainIcon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-zinc-100">{airdrop.projectName}</h3>
                  <p className="text-sm text-zinc-400">{airdrop.chain}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {airdrop.claimable ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-green-900/30 text-green-400 border border-green-700/50 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    <Check className="w-3 h-3" />
                    Claimable
                  </motion.div>
                ) : airdrop.isAlreadyStaked ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-enso-purple/20 text-enso-purple border border-enso-purple/50 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    <TrendingUp className="w-3 h-3" />
                    Already Staked
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-1 bg-zinc-800 text-zinc-500 border border-zinc-700 px-2 py-1 rounded-full text-xs font-medium">
                    <X className="w-3 h-3" />
                    Not Claimable
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* 토큰 정보 */}
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-zinc-400">
                    {airdrop.isAlreadyStaked ? 'Staked Tokens' : 'Claimable Tokens'}
                  </p>
                  <p className="text-3xl font-bold text-zinc-100">
                    {airdrop.isAlreadyStaked ?
                      airdrop.onChainStaking?.stakedAmount.toLocaleString() :
                      airdrop.amount.toLocaleString()
                    } <span className="text-lg text-zinc-400">{airdrop.token}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">
                    {airdrop.isAlreadyStaked ? 'Unlock Date' : 'TGE Schedule'}
                  </p>
                  <p className="text-lg font-semibold text-enso-cyan">
                    {airdrop.isAlreadyStaked ?
                      (airdrop.onChainStaking?.unlockDate ? new Date(airdrop.onChainStaking.unlockDate).toLocaleDateString() : 'TBD') :
                      (airdrop.tgeDate ? new Date(airdrop.tgeDate).toLocaleDateString() : 'TBD')
                    }
                  </p>
                </div>
              </div>

              {/* 스테이킹 섹션 */}
              {airdrop.claimable && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-zinc-800 pt-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-enso-purple" />
                      <span className="text-sm font-medium text-zinc-300">Immediate staking after claim</span>
                    </div>
                    <Switch
                      checked={willStake}
                      onChange={handleStakeToggle}
                      disabled={disabled}
                    />
                  </div>

                  <AnimatePresence>
                    {willStake && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3 bg-zinc-800/50 rounded-lg p-3 border border-zinc-700"
                      >
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Select Lock Period
                          </label>
                          <Select
                            value={selectedDuration}
                            onChange={handleDurationChange}
                            disabled={disabled}
                            placeholder="Select lock period"
                          >
                            {airdrop.stakingOptions.map((option) => (
                              <option key={option.duration} value={option.duration}>
                                {option.displayName} (APR {option.apr}%)
                              </option>
                            ))}
                          </Select>
                        </div>

                        {selectedOption && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-2 gap-3 text-xs"
                          >
                            <div className="bg-zinc-700/50 rounded p-2">
                              <div className="flex items-center gap-1 text-zinc-400 mb-1">
                                <Percent className="w-3 h-3" />
                                APR
                              </div>
                              <div className="text-enso-purple font-semibold">{selectedOption.apr}%</div>
                            </div>
                            <div className="bg-zinc-700/50 rounded p-2">
                              <div className="text-zinc-400 mb-1">Est. Rewards</div>
                              <div className="text-green-400 font-semibold">
                                +{estimatedRewards.toLocaleString()} {airdrop.token}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* 온체인 스테이킹 정보 */}
              {airdrop.isAlreadyStaked && airdrop.onChainStaking && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-zinc-800 pt-4 space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-enso-purple" />
                    <span className="text-sm font-medium text-zinc-300">On-Chain Staking Position</span>
                  </div>

                  <div className="space-y-3 bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-xs text-zinc-400">Lock Duration</div>
                        <div className="text-sm font-semibold text-enso-cyan">
                          {airdrop.onChainStaking.lockDuration}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-zinc-400">APR</div>
                        <div className="text-sm font-semibold text-yellow-400">
                          {airdrop.onChainStaking.stakingApr}%
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-zinc-700 pt-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-zinc-400">Rewards Progress</span>
                        <span className="text-xs text-zinc-300">
                          {airdrop.onChainStaking.accruedRewards.toFixed(1)} / {airdrop.onChainStaking.estimatedRewards.toFixed(1)} {airdrop.token}
                        </span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((airdrop.onChainStaking.accruedRewards / airdrop.onChainStaking.estimatedRewards) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-2 enso-gradient rounded-full"
                        />
                      </div>
                    </div>

                    <div className="bg-zinc-700/50 rounded-lg p-3 border border-zinc-600">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Total at Unlock</span>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-400">
                            {(airdrop.onChainStaking.stakedAmount + airdrop.onChainStaking.estimatedRewards).toLocaleString()} {airdrop.token}
                          </div>
                          <div className="text-xs text-zinc-500">
                            +{airdrop.onChainStaking.estimatedRewards.toLocaleString()} rewards
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 체크박스 */}
              {airdrop.claimable && (
                <div className="flex justify-center pt-2 border-t border-zinc-800">
                  <Checkbox
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    disabled={disabled}
                    label="Include in claim"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}