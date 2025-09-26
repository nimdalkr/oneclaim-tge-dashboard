// Simple global wallet state store
interface WalletState {
  isConnected: boolean
  address: string | null
  isConnecting: boolean
}

class WalletStore {
  private state: WalletState = {
    isConnected: false,
    address: null,
    isConnecting: false
  }

  private listeners: Array<(state: WalletState) => void> = []

  getState(): WalletState {
    return { ...this.state }
  }

  setState(newState: Partial<WalletState>) {
    this.state = { ...this.state, ...newState }
    this.listeners.forEach(listener => listener(this.state))
  }

  subscribe(listener: (state: WalletState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }
}

export const walletStore = new WalletStore()