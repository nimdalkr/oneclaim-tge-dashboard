# OneClaim - TGE Token Dashboard

OneClaim is a modern web dashboard for claiming and staking TGE (Token Generation Event) tokens across multiple blockchains. Built with Next.js 14 and TypeScript, featuring smooth animations powered by Framer Motion.

## Key Features

- **Wallet Connection**: Mock wallet connection flow with multiple wallet support
- **Multi-chain Support**: Support for various blockchain networks
- **Claim Management**: Individual selection and batch claiming by chain
- **Staking Integration**: Direct staking options with APR calculations
- **Real-time Summary**: Claimable token value and gas fee calculations
- **Feedback System**: Toast notifications for claim results
- **Responsive Design**: Perfect support for mobile/desktop
- **Smooth Animations**: Framer Motion based interactions
- **Activity Dashboard**: Portfolio tracking and wallet analytics

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Build Tool**: Next.js built-in Turbopack

## Project Structure

```
claimboard/
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Main dashboard page
│   ├── components/                  # Reusable components
│   │   ├── dashboard/               # Dashboard components
│   │   │   ├── AirdropActivityDashboard.tsx
│   │   │   └── StakingDashboard.tsx
│   │   ├── layout/                  # Layout components
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── TGEAirdropCard.tsx
│   │   │   ├── TGESummary.tsx
│   │   │   └── TGEClaimButton.tsx
│   │   └── ui/                      # Basic UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Checkbox.tsx
│   │       └── Toast.tsx
│   ├── hooks/                       # Custom React hooks
│   │   ├── useWallet.ts
│   │   ├── useClaimAndStake.ts
│   │   └── useToast.ts
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts
│   ├── data/                        # Mock data
│   │   └── mockAirdrops.ts
│   └── lib/                         # Utility functions
│       └── utils.ts
├── public/                          # Static assets
│   └── logos/                       # Token and wallet logos
└── ...configuration files
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 3. Open in Browser

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage Guide

1. **Connect Wallet**: Click the "Connect Wallet" button in the top right
2. **Select Tokens**: Choose TGE tokens you want to claim
3. **Configure Staking**: Set staking options for each token (optional)
4. **Review Summary**: Check total value and gas fees on the right panel
5. **Execute Claim**: Click "Claim All" button to process selected tokens
6. **Check Results**: View claim status through toast notifications and result cards

## Main Features

### TGE Token Management
- Token claim interface with staking options
- APR calculations for different lock periods
- Real-time value tracking

### Activity Dashboard
- Multi-wallet portfolio overview
- Token holdings with price tracking
- Connected wallet management

### Staking Dashboard
- Active staking positions
- Reward calculations and tracking
- Position management interface

## Key Components

### TGEAirdropCard
- Individual TGE token claim interface
- Staking option configuration
- Token amount and value display

### AirdropActivityDashboard
- Portfolio overview with statistics
- Multi-wallet support
- Token holdings visualization

### StakingDashboard
- Active staking positions display
- Reward tracking and calculations
- Position management tools

## Build and Deployment

### Production Build
```bash
npm run build
```

### Production Server
```bash
npm run start
```

### Type Check
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

## Demo Data

This project is not connected to actual blockchains and uses mock data:

- **ENSO**: 85 tokens (claimable)
- **Plasma**: 500 tokens (already staked)
- **Allora Network**: 230 tokens (claimable)
- **Mira Network**: Not available
- **Opensea**: 120 tokens (claimable)

Claim simulation mimics actual network delays and success/failure rates.

## Customization

### Adding New Tokens
Add new tokens in `src/data/mockAirdrops.ts`:

```typescript
export const mockAirdrops: MockAirdrop[] = [
  // existing tokens...
  {
    id: 'new-token',
    projectName: 'New Project',
    chain: 'Ethereum',
    token: '$NEW',
    amount: 100,
    claimable: true,
    stakingOptions: [
      { duration: '1M', apr: 5, displayName: '1 month' },
      { duration: '3M', apr: 10, displayName: '3 months' },
      { duration: '6M', apr: 15, displayName: '6 months' }
    ]
  }
]
```

### Style Modifications
Modify Tailwind CSS classes or add custom CSS in `src/app/globals.css`.

## Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column grid
- **Desktop**: Multi-column grid with sidebar

## Important Notes

**This project is for demo/prototype purposes only**

- Not connected to actual blockchains
- Wallet connection is mock functionality
- Transaction hashes are fake
- Production use requires actual web3 library integration

## Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is under the MIT License. See the `LICENSE` file for details.

---

**Created by**: Claude Code
**Version**: 1.0.0
**Last Updated**: December 2024