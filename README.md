# 🚀 ClaimBoard - 크로스체인 에어드롭 클레임 대시보드

ClaimBoard는 여러 블록체인의 에어드롭을 한 번에 확인하고 클레임할 수 있는 모던한 웹 대시보드입니다. Next.js 14와 TypeScript로 구축되었으며, Framer Motion으로 부드러운 애니메이션을 제공합니다.

## ✨ 주요 기능

- **지갑 연결**: 모의 지갑 연결 플로우
- **멀티체인 지원**: zkSync, Base, Linea 체인
- **클레임 관리**: 체인별 개별 선택 및 일괄 클레임
- **실시간 요약**: 클레임 가능한 토큰 가치와 가스비 계산
- **피드백 시스템**: Toast 알림으로 클레임 결과 표시
- **반응형 디자인**: 모바일/데스크톱 완벽 지원
- **부드러운 애니메이션**: Framer Motion 기반 인터렉션

## 🛠️ 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **상태 관리**: React Hooks
- **빌드 도구**: Next.js 내장 Turbopack

## 📁 프로젝트 구조

```
claimboard/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── globals.css         # 글로벌 스타일
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   └── page.tsx            # 메인 대시보드 페이지
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── layout/             # 레이아웃 컴포넌트
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── ClaimChainCard.tsx
│   │   │   ├── ClaimSummary.tsx
│   │   │   └── ClaimButton.tsx
│   │   └── ui/                 # 기본 UI 컴포넌트
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Checkbox.tsx
│   │       └── Toast.tsx
│   ├── hooks/                  # 커스텀 React 훅
│   │   ├── useWallet.ts
│   │   ├── useClaim.ts
│   │   └── useToast.ts
│   ├── types/                  # TypeScript 타입 정의
│   │   └── index.ts
│   ├── data/                   # 모의 데이터
│   │   └── mockData.ts
│   └── lib/                    # 유틸리티 함수
│       └── utils.ts
├── public/                     # 정적 자산
└── ...설정 파일들
```

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 2. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

### 3. 브라우저에서 확인

[http://localhost:3000](http://localhost:3000)을 열어서 애플리케이션을 확인하세요.

## 🎯 사용 방법

1. **지갑 연결**: 우측 상단의 "지갑 연결" 버튼을 클릭
2. **체인 선택**: 클레임하고 싶은 체인들을 선택
3. **요약 확인**: 우측에서 총 수익과 가스비를 확인
4. **클레임 실행**: "전체 클레임" 버튼으로 선택한 체인들을 일괄 처리
5. **결과 확인**: Toast 알림과 결과 카드로 클레임 상태 확인

## 🎨 주요 컴포넌트

### WalletConnect
- 지갑 연결/해제 기능
- 연결된 주소 표시
- 로딩 상태 관리

### ClaimChainCard
- 체인별 클레임 가능 정보 표시
- 토큰 수량과 USD 가치 표시
- 체크박스로 선택/해제

### ClaimSummary
- 선택된 체인 요약
- 총 수익과 가스비 계산
- 순 수익 계산

### ClaimButton
- 일괄 클레임 실행
- 프로그레스 표시
- 클레임 결과 피드백

## 🔧 빌드 및 배포

### 프로덕션 빌드
```bash
npm run build
```

### 프로덕션 서버 실행
```bash
npm run start
```

### 타입 체크
```bash
npx tsc --noEmit
```

### 린팅
```bash
npm run lint
```

## 🎭 데모 데이터

이 프로젝트는 실제 블록체인과 연결되지 않으며, 다음과 같은 모의 데이터를 사용합니다:

- **zkSync**: 120 ZK 토큰 ($240.50)
- **Base**: 0 BASE 토큰 ($0.00) - 클레임 불가
- **Linea**: 45 LIN 토큰 ($85.30)

클레임 시뮬레이션은 실제 네트워크 지연과 성공/실패율을 모방합니다.

## 🎨 커스터마이징

### 체인 추가
`src/data/mockData.ts`에서 새로운 체인을 추가할 수 있습니다:

```typescript
export const SUPPORTED_CHAINS: Chain[] = [
  // 기존 체인들...
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    symbol: 'ARB',
    logo: '🔴',
    color: '#12D8FA',
    gradientClass: 'bg-gradient-to-r from-blue-400 to-cyan-400'
  }
]
```

### 스타일 수정
Tailwind CSS 클래스를 수정하거나 `src/app/globals.css`에서 커스텀 CSS를 추가할 수 있습니다.

## 📱 반응형 디자인

- **모바일**: 단일 컬럼 레이아웃
- **태블릿**: 2컬럼 그리드
- **데스크톱**: 3컬럼 그리드 + 사이드바

## 🚨 주의사항

⚠️ **이 프로젝트는 데모/프로토타입 목적으로만 사용하세요**

- 실제 블록체인과 연결되지 않습니다
- 지갑 연결은 모의 기능입니다
- 트랜잭션 해시는 가짜입니다
- 프로덕션 환경에서 사용하려면 실제 web3 라이브러리 통합이 필요합니다

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 기능 브랜치를 만드세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 열어주세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

---

**만든이**: Claude Code
**버전**: 1.0.0
**마지막 업데이트**: 2024년 12월