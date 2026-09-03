# 쇼핑몰 관리자 대시보드 (E-Commerce Admin Dashboard)

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Testing](https://img.shields.io/badge/Testing-Vitest-green?logo=vitest)
![Architecture](https://img.shields.io/badge/Architecture-Clean-orange)

**클린 아키텍처** 원칙을 엄격히 따르는 엔드-투-엔드 쇼핑몰 관리자 대시보드입니다.  
🚀 **지금 바로 로그인 없이 시작 가능!** (Mock 데이터)

---

## 📋 목차

- [🚀 빠른 시작](#-빠른-시작)
- [✨ 주요 기능](#-주요-기능)
- [🛠️ 기술 스택](#️-기술-스택)
- [📁 프로젝트 구조](#-프로젝트-구조)
- [📦 Mock 데이터](#-mock-데이터)
- [💻 개발 환경](#-개발-환경)
- [🔄 아키텍처](#-아키텍처)
- [🧪 테스트](#-테스트)
- [🌐 10개 관리 화면](#-10개-관리-화면)
- [🚢 배포](#-배포)

---

## 🚀 빠른 시작

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 접속
http://localhost:3000/admin
```

✅ **로그인 불필요!** Mock 데이터로 즉시 대시보드 확인 가능

---

## ✨ 주요 기능

### 1️⃣ 대시보드 홈 (완성 ✅)

**4개 KPI 카드**
- 💰 오늘 매출: ₩2,543,000
- 📦 신규 주문: 12건
- 👥 신규 고객: 8명
- ⚠️ 재고 부족: 3개

**차트 & 시각화**
- 📈 주간 매출 추이 (AreaChart with Gradient)
- 🥧 카테고리별 판매 비율 (PieChart)
- 📋 최근 주문 테이블 (10개)

**네비게이션 사이드바**
- 🏠 대시보드 (현재)
- 📦 상품 관리 (준비 중)
- 🛒 주문 관리 (준비 중)
- 👥 고객 관리 (준비 중)
- 📈 매출 분석 (준비 중)
- ⚙️ 스토어 설정 (준비 중)

### 2️⃣ 상품 관리 (예정)
- 상품 목록 조회 & 검색
- 상품 등록/수정
- 이미지 업로드
- 재고 추적

### 3️⃣ 주문 관리 (예정)
- 주문 현황 조회
- 상태 변경 (결제 대기 → 배송중 → 완료)
- 배송 추적

### 4️⃣ 고객 관리 (예정)
- 고객 정보 조회
- 주문 이력
- VIP 관리

### 5️⃣ 매출 분석 (예정)
- 월간/주간 매출 분석
- 카테고리별 판매량
- 베스트셀러 순위

---

## 🛠️ 기술 스택

### 프론트엔드
- **Next.js 16** - App Router, SSR/SSG
- **React 19** - 최신 컴포넌트 아키텍처
- **TypeScript 5** - Strict Mode

### UI & 스타일링
- **Tailwind CSS 4** - 유틸리티 기반 CSS
- **Lucide React** - 미니멀한 아이콘
- **Recharts** - 반응형 차트 라이브러리

### 데이터 & 검증
- **Supabase** - PostgreSQL DB, Auth, Storage
- **TanStack React Form** - 폼 상태 관리
- **Zod** - 타입 안전한 데이터 검증

### 테스트
- **Vitest** - 고속 단위 테스트
- **Testing Library** - React 컴포넌트 테스트
- **@vitest/coverage** - 커버리지 분석

---

## 📁 프로젝트 구조

```
ecommerce-admin/
│
├── core/                              # 비즈니스 로직 (프레임워크 독립)
│   ├── domain/                        # 1계층: 엔티티 & 비즈니스 규칙
│   │   ├── entities/
│   │   │   ├── dashboard.ts          # DashboardStats, WeeklySales, ...
│   │   │   └── (다른 엔티티)
│   │   └── repositories/              # 리포지토리 인터페이스
│   │       ├── IDashboardRepository.ts
│   │       └── (다른 인터페이스)
│   │
│   └── application/                   # 2계층: 유스케이스
│       └── use-cases/
│           ├── GetDashboardStatsUseCase.ts
│           └── (다른 유스케이스)
│
├── infrastructure/                    # 3계층: 외부 연동 & 구현체
│   ├── supabase/                      # Supabase 연동
│   │   ├── supabaseClient.ts
│   │   ├── serverClient.ts
│   │   └── RLS.sql
│   │
│   └── repositories/                  # 리포지토리 구현체
│       ├── index.ts                  # 🎯 의존성 주입 (Mock/Supabase 전환)
│       ├── mock-dashboard.repository.ts
│       ├── SupabaseDashboardRepository.ts
│       └── USAGE.md                  # 사용 가이드
│
├── src/app/                          # 4계층: Next.js 프레젠테이션
│   ├── admin/                        # 관리자 영역
│   │   ├── layout.tsx               # 대시보드 레이아웃 (사이드바 + 헤더)
│   │   ├── page.tsx                 # 메인 대시보드
│   │   ├── components/              # 공유 컴포넌트
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── WeeklySalesChart.tsx
│   │   │   ├── CategorySalesChart.tsx
│   │   │   └── RecentOrdersTable.tsx
│   │   ├── products/               # 상품 관리 (예정)
│   │   ├── orders/                 # 주문 관리 (예정)
│   │   ├── customers/              # 고객 관리 (예정)
│   │   └── analytics/              # 매출 분석 (예정)
│   │
│   ├── (auth)/                     # 인증 페이지
│   │   └── login/                  # 로그인 (예정)
│   │
│   ├── globals.css                 # 전역 스타일
│   └── layout.tsx                  # 루트 레이아웃
│
├── public/                         # 정적 자산
├── supabase/                       # Supabase 마이그레이션
│   └── migrations/                # SQL 마이그레이션 파일
│
├── CLAUDE.md                       # 클린 아키텍처 규칙
├── package.json                    # 의존성
├── tsconfig.json                   # TypeScript 설정
├── vitest.config.ts               # 테스트 설정
└── README.md                       # 본 문서
```

---

## 📦 Mock 데이터

### 🎯 목적

**로그인 없이** 즉시 대시보드를 테스트할 수 있습니다!

### 📊 데이터 규모

| 항목 | 수량 | 상세 |
|------|------|------|
| **상품** | 10건 | 5개 카테고리 (전자제품, 의류, 화장품, 생활용품, 식품) |
| **고객** | 12명 | 한국식 이름, 이메일, 전화번호 |
| **주문** | 60건 | 최근 90일에 분산, 다양한 상태 |
| **재고 부족** | 3개 | stock < 10인 상품 자동 표시 |

### 🔄 데이터 소스 전환

#### Mock 데이터 사용 (현재 기본값)

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=true

npm run dev
# → 로그인 불필요, 빠른 로드
```

#### Supabase 실제 데이터 사용

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

npm run dev
# → Supabase에서 데이터 로드
```

**특징**: UI 코드 수정 없이 **1줄 변경**으로 전환!

### 📋 Mock 데이터 예시

**상품 샘플**
```
1. 프리미엉 기계식 키보드 (전자제품, ₩189,000, 재고 35)
2. 클린 아키텍처 머그컵 (생활용품, ₩18,000, 재고 120)
3. 노이즈 캔슬링 헤드폰 (전자제품, ₩299,000, 재고 4) ⚠️
4. 오버핏 데님 자켓 (의류, ₩89,000, 재고 0) ❌
... 총 10건
```

**주문 상태 분포**
```
✅ 배송완료 (40%) - 매출에 카운트
📦 배송중 (20%)
🔄 준비중 (15%)
⏳ 결제대기 (15%)
❌ 취소 (10%)
```

**주간 매출 추이**
```
Sun: 450,000  | Mon: 620,000  | Tue: 580,000
Wed: 720,000  | Thu: 890,000  | Fri: 1,200,000 ⬆️
Sat: 950,000
```

---

## 💻 개발 환경

### 필수 요구사항

- Node.js 18+
- npm / yarn

### 설치

```bash
git clone <repository-url>
cd ecommerce-admin
npm install
```

### 환경 변수 (.env.local)

```env
# Mock 데이터 사용
NEXT_PUBLIC_USE_MOCK=true

# Supabase (선택사항)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_service_role_key
```

### 개발 서버

```bash
npm run dev
# → http://localhost:3000/admin
```

---

## 🔄 아키텍처

### 클린 아키텍처 4계층

```
┌─────────────────────────────────────────────┐
│ 4. Presentation Layer (src/app/)            │
│    UI 렌더링, 라우팅, 컴포넌트              │
├─────────────────────────────────────────────┤
│ 3. Infrastructure Layer (infrastructure/)   │
│    Supabase, Mock 리포지토리, 외부 API      │
├─────────────────────────────────────────────┤
│ 2. Application Layer (core/application/)    │
│    유스케이스, 비즈니스 로직 조율           │
├─────────────────────────────────────────────┤
│ 1. Domain Layer (core/domain/)              │
│    엔티티, 인터페이스, 비즈니스 규칙       │
└─────────────────────────────────────────────┘
```

### 의존성 규칙

```
Domain ← Application ← Infrastructure ← Presentation
  ↑            ↑              ↑
  외부 라이브러리 완전 독립
```

### 디자인 패턴

- **전략 패턴** (Strategy Pattern): Mock/Supabase 리포지토리 교체
- **팩토리 패턴** (Factory Pattern): `DashboardRepositoryFactory`
- **의존성 주입** (Dependency Injection): 유스케이스에 리포지토리 주입

---

## 🧪 테스트

### 테스트 작성 (TDD)

```bash
# 단위 테스트 (개발 모드)
npm run test

# 한 번 실행
npm run test:run

# 커버리지 리포트
npm run test:coverage
```

### 커버리지 목표

| 계층 | 목표 | 우선순위 |
|------|------|---------|
| **Domain** | 100% | 🔴 최고 |
| **Application** | 80%+ | 🔴 최고 |
| **Infrastructure** | 50%+ | 🟡 중간 |
| **Presentation** | 필요시 | 🟢 낮음 |

### 테스트 예제

```typescript
// core/application/use-cases/__tests__/GetDashboardStatsUseCase.test.ts
import { describe, it, expect, vi } from 'vitest';
import { GetDashboardStatsUseCase } from '../GetDashboardStatsUseCase';
import { MockDashboardRepository } from '@/infrastructure/repositories/mock-dashboard.repository';

describe('GetDashboardStatsUseCase', () => {
  it('should return dashboard stats with mock data', async () => {
    const repository = new MockDashboardRepository();
    const useCase = new GetDashboardStatsUseCase(repository);

    const result = await useCase.execute();

    expect(result.stats.todaySales).toBeGreaterThan(0);
    expect(result.weeklySales).toHaveLength(7);
    expect(result.categorySales.length).toBeGreaterThan(0);
  });
});
```

---

## 🌐 10개 관리 화면

| # | 화면 | 상태 | 설명 |
|---|------|------|------|
| 1 | 로그인 | ⏳ 예정 | 관리자 인증 |
| 2 | **대시보드** | ✅ 완성 | 통계 및 주요 지표 |
| 3 | 상품 목록 | ⏳ 예정 | 전체 상품 조회 |
| 4 | 상품 신규 등록 | ⏳ 예정 | 상품 추가 |
| 5 | 상품 상세/수정 | ⏳ 예정 | 상품 정보 변경 |
| 6 | 주문 목록 | ⏳ 예정 | 전체 주문 조회 |
| 7 | 주문 상세 | ⏳ 예정 | 주문 정보 조회 |
| 8 | 고객 목록 | ⏳ 예정 | 전체 고객 조회 |
| 9 | 고객 상세 | ⏳ 예정 | 고객 정보 조회 |
| 10 | 매출 분석 | ⏳ 예정 | 통계 차트 |

---

## 🚢 배포

### Vercel 배포

```bash
# 1. GitHub에 푸시
git push origin main

# 2. Vercel에서 자동 배포
# (또는 Vercel 대시보드에서 수동 배포)
```

### 환경 변수 설정 (Vercel)

Settings → Environment Variables:

```
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SECRET_KEY=your_secret_key
```

### Supabase 마이그레이션

```bash
# Supabase 대시보드 → SQL Editor
# supabase/migrations/ 의 SQL 파일 실행
```

---

## 📚 더 알아보기

| 파일 | 내용 |
|------|------|
| **CLAUDE.md** | 클린 아키텍처 규칙 & 개발 표준 |
| **infrastructure/repositories/USAGE.md** | Mock/Supabase 리포지토리 사용법 |
| **supabase/migrations/** | 데이터베이스 스키마 SQL |

---

## 🎯 현재 진행 현황

```
✅ 완성
  - 클린 아키텍처 4계층 구조
  - 대시보드 홈 화면 (KPI, 차트, 테이블)
  - Mock 리포지토리 (상품 10건, 고객 12명, 주문 60건)
  - 의존성 주입 패턴 (Mock ↔ Supabase 전환)
  - Vitest 테스트 환경
  - README & 문서

⏳ 진행 중
  - 나머지 9개 화면 구현
  - 통합 테스트 작성
  - Supabase 실제 연동

🔮 계획
  - 로그인 페이지
  - 고급 필터링 & 검색
  - 실시간 알림
  - 사용자 권한 관리
```

---

## 🤝 기여 가이드

1. **TDD 준수**: 테스트 먼저, 구현 후
2. **클린 아키텍처**: 계층 분리 유지
3. **커밋 메시지**: `feat:`, `fix:`, `docs:` 등 접두사 사용
4. **타입 안전**: `any` 타입 금지

---

## 📝 라이선스

MIT License

---

## 📞 지원

질문이나 이슈가 있으면 GitHub Issues에 보고해주세요.

---

**버전**: 0.1.0  
**최종 업데이트**: 2026-09-03
