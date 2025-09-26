'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Check, X, ExternalLink, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ClaimResult } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface ClaimButtonProps {
  selectedChains: string[]
  totalValue: number
  isWalletConnected: boolean
  isProcessing: boolean
  onClaim: () => Promise<ClaimResult[]>
  onShowToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void
}

export const ClaimButton = ({
  selectedChains,
  totalValue,
  isWalletConnected,
  isProcessing,
  onClaim,
  onShowToast
}: ClaimButtonProps) => {
  const [results, setResults] = useState<ClaimResult[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleClaim = async () => {
    try {
      const claimResults = await onClaim()
      setResults(claimResults)
      setShowResults(true)

      const successCount = claimResults.filter(r => r.success).length
      const failCount = claimResults.length - successCount

      if (successCount > 0 && failCount === 0) {
        onShowToast('success', `모든 클레임이 성공했습니다! 🎉`, `${successCount}개 체인에서 성공적으로 클레임했습니다`)
      } else if (successCount > 0 && failCount > 0) {
        onShowToast('info', `일부 클레임이 완료되었습니다`, `성공: ${successCount}개, 실패: ${failCount}개`)
      } else {
        onShowToast('error', '모든 클레임이 실패했습니다', '다시 시도해주세요')
      }

      // 결과를 5초 후에 숨김
      setTimeout(() => {
        setShowResults(false)
      }, 5000)
    } catch (error) {
      onShowToast('error', '클레임 처리 중 오류가 발생했습니다', error instanceof Error ? error.message : '알 수 없는 오류')
    }
  }

  const isDisabled = !isWalletConnected || selectedChains.length === 0 || isProcessing

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
          className={`w-full h-14 text-lg font-semibold transition-all duration-300 ${
            !isDisabled
              ? 'enso-gradient hover:enso-gradient-hover animate-pulse-glow enso-glow-hover text-white shadow-lg'
              : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
          }`}
        >
          <Zap className="w-5 h-5 mr-2" />
          {isProcessing
            ? `클레임 처리 중... (${selectedChains.length}개 체인)`
            : isWalletConnected
            ? selectedChains.length > 0
              ? `전체 클레임 (${formatCurrency(totalValue)})`
              : '체인을 선택해주세요'
            : '먼저 지갑을 연결해주세요'
          }
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
              지갑을 연결하여 클레임을 시작하세요
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
                  <Check className="w-5 h-5 text-green-400" />
                  클레임 결과
                </h3>
                <div className="space-y-2">
                  {results.map((result) => (
                    <motion.div
                      key={result.chainId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        result.success
                          ? 'bg-green-900/20 border-green-700/50'
                          : 'bg-red-900/20 border-red-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {result.success ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                        <div>
                          <span className="font-medium capitalize text-zinc-100">
                            {result.chainId}
                          </span>
                          {result.error && (
                            <p className="text-sm text-red-400">{result.error}</p>
                          )}
                        </div>
                      </div>
                      {result.success && result.txHash && (
                        <div className="flex items-center gap-1 text-sm text-enso-cyan hover:text-enso-pink cursor-pointer transition-colors">
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-mono">{result.txHash}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}