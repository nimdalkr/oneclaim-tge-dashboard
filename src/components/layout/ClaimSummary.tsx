'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Zap, CheckCircle, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ClaimSummaryData } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface ClaimSummaryProps {
  summaryData: ClaimSummaryData
}

export const ClaimSummary = ({ summaryData }: ClaimSummaryProps) => {
  const {
    totalClaimableChains,
    totalUsdValue,
    estimatedGasFee,
    selectedChains
  } = summaryData

  const netValue = totalUsdValue - estimatedGasFee

  const summaryItems = [
    {
      icon: CheckCircle,
      label: '클레임 가능한 체인',
      value: `${totalClaimableChains}개`,
      color: 'text-enso-cyan',
      bgColor: 'bg-zinc-800 border-zinc-700'
    },
    {
      icon: TrendingUp,
      label: '총 예상 수익',
      value: formatCurrency(totalUsdValue),
      color: 'text-enso-purple',
      bgColor: 'bg-zinc-800 border-zinc-700'
    },
    {
      icon: Zap,
      label: '예상 가스비',
      value: formatCurrency(estimatedGasFee),
      color: 'text-yellow-400',
      bgColor: 'bg-zinc-800 border-zinc-700'
    },
    {
      icon: DollarSign,
      label: '순 수익',
      value: formatCurrency(netValue),
      color: netValue >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: 'bg-zinc-800 border-zinc-700'
    }
  ]

  if (totalClaimableChains === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="text-center p-8 bg-zinc-900 border-zinc-800">
          <div className="text-zinc-600 mb-4">
            <CheckCircle className="w-16 h-16 mx-auto opacity-30" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-2">
            클레임 가능한 에어드롭이 없습니다
          </h3>
          <p className="text-sm text-zinc-500">
            지갑을 연결하고 클레임 가능한 에어드롭을 확인해보세요.
          </p>
        </Card>
      </motion.div>
    )
  }

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
            클레임 요약
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

          {selectedChains.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="border-t border-zinc-800 pt-4"
            >
              <h4 className="font-medium text-zinc-300 mb-2">
                선택된 체인 ({selectedChains.length}개)
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedChains.map((chainId) => (
                  <span
                    key={chainId}
                    className="px-2 py-1 bg-enso-cyan/20 text-enso-cyan border border-enso-cyan/30 text-xs font-medium rounded-full"
                  >
                    {chainId.toUpperCase()}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {selectedChains.length === 0 && totalClaimableChains > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4 border-t border-zinc-800"
            >
              <p className="text-sm text-zinc-400">
                클레임할 체인을 선택해주세요
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}