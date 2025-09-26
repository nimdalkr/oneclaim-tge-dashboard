'use client'

import { motion } from 'framer-motion'
import { Check, X, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Checkbox } from '@/components/ui/Checkbox'
import { Chain, ClaimableReward } from '@/types'

interface ClaimChainCardProps {
  chain: Chain
  reward: ClaimableReward
  isSelected: boolean
  onSelectionChange: (chainId: string, selected: boolean) => void
  disabled?: boolean
}

export const ClaimChainCard = ({
  chain,
  reward,
  isSelected,
  onSelectionChange,
  disabled = false
}: ClaimChainCardProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectionChange(chain.id, e.target.checked)
  }

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
          isSelected && reward.isClaimable
            ? 'enso-border-gradient p-[1px] enso-glow'
            : 'p-0'
        }`}
      >
        <Card
          hoverable={reward.isClaimable && !disabled}
          className={`transition-all duration-300 bg-zinc-900 border-zinc-800 text-zinc-100 ${
            reward.isClaimable && !disabled
              ? 'hover:shadow-lg cursor-pointer hover:bg-zinc-800/50 enso-glow-hover'
              : 'opacity-75'
          } ${
            isSelected && reward.isClaimable
              ? 'shadow-xl'
              : ''
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${chain.gradientClass}`}
                >
                  {chain.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-zinc-100">{chain.name}</h3>
                  <p className="text-sm text-zinc-400">{chain.symbol}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {reward.isClaimable ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-green-900/30 text-green-400 border border-green-700/50 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    <Check className="w-3 h-3" />
                    클레임 가능
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-1 bg-zinc-800 text-zinc-500 border border-zinc-700 px-2 py-1 rounded-full text-xs font-medium">
                    <X className="w-3 h-3" />
                    클레임 불가
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
                  <p className="text-sm text-zinc-400">클레임 가능한 토큰</p>
                  <p className="text-2xl font-bold text-zinc-100">
                    {reward.amount.toLocaleString()} {reward.tokenSymbol}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-zinc-400 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    USD 가치
                  </p>
                  <p className="text-xl font-semibold text-enso-cyan">
                    ${reward.usdValue.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* 가스비 정보 */}
              {reward.isClaimable && reward.estimatedGas && (
                <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                  <span className="text-sm text-zinc-400">예상 가스비</span>
                  <span className="text-sm font-medium text-zinc-300">${reward.estimatedGas}</span>
                </div>
              )}

              {/* 체크박스 */}
              {reward.isClaimable && (
                <div className="flex justify-center pt-2 border-t border-zinc-800">
                  <Checkbox
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    disabled={disabled}
                    label="클레임에 포함하기"
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