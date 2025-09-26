import { Chain, ClaimableReward } from '@/types'

export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: 'zksync',
    name: 'zkSync',
    symbol: 'ZK',
    logo: '🔷',
    color: '#4f46e5',
    gradientClass: 'chain-gradient-zk'
  },
  {
    id: 'base',
    name: 'Base',
    symbol: 'BASE',
    logo: '🔵',
    color: '#0ea5e9',
    gradientClass: 'chain-gradient-base'
  },
  {
    id: 'linea',
    name: 'Linea',
    symbol: 'LIN',
    logo: '🟢',
    color: '#10b981',
    gradientClass: 'chain-gradient-linea'
  }
]

export const MOCK_REWARDS: ClaimableReward[] = [
  {
    chainId: 'zksync',
    tokenSymbol: 'ZK',
    amount: 120,
    usdValue: 240.5,
    isClaimable: true,
    estimatedGas: 15
  },
  {
    chainId: 'base',
    tokenSymbol: 'BASE',
    amount: 0,
    usdValue: 0,
    isClaimable: false,
    estimatedGas: 0
  },
  {
    chainId: 'linea',
    tokenSymbol: 'LIN',
    amount: 45,
    usdValue: 85.3,
    isClaimable: true,
    estimatedGas: 12
  }
]

export const MOCK_WALLET_ADDRESS = '0xABCD...1234'

export const generateMockTxHash = (chainId: string): string => {
  const randomHex = Math.random().toString(16).substring(2, 10)
  return `0x${chainId.substring(0, 4)}${randomHex}...${Math.random().toString(16).substring(2, 6)}`
}

export const simulateClaimDelay = (chainId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // zkSync has 90% success rate, Base has 30% (low balance), Linea has 95%
      const successRate = chainId === 'zksync' ? 0.9 : chainId === 'base' ? 0.3 : 0.95
      resolve(Math.random() < successRate)
    }, 1500 + Math.random() * 2000) // 1.5-3.5 seconds delay
  })
}