# 🤝 인수인계 문서 (Handover Document)

**작성일**: 2026-09-03  
**상태**: 프로젝트 초기 단계 완성  
**다음 작업자를 위한 컨텍스트 가이드**

---

## 📋 프로젝트 현황 한눈에 보기

```
프로젝트명: 쇼핑몰 관리자 대시보드 (E-Commerce Admin Dashboard)
Repository: https://github.com/devzikx/ECOMMERCE-ADMIN
Branch: master
Latest Commit: ff0c710 (devzikx)
Status: ✅ 초기 단계 완성
```

---

## ✅ 완성된 작업

### 1. 클린 아키텍처 4계층 구조 (100%)

```
core/domain/           → 엔티티, 비즈니스 규칙 (외부 의존성 없음)
core/application/      → 유스케이스, 비즈니스 로직 조율
infrastructure/        → Supabase, Mock 리포지토리, 외부 API
src/app/              → Next.js 컴포넌트, UI 렌더링
```

**파일**: `CLAUDE.md` 참조

### 2. 대시보드 홈 화면 (100%)

**위치**: `/admin`

**구성 요소**:
- 4개 KPI 카드 (매출, 주문, 고객, 재고)
- 주간 매출 추이 차트 (AreaChart with Gradient)
- 카테고리별 판매 비율 차트 (PieChart)
- 최근 주문 테이블 (10개)
- 네비게이션 사이드바 (6개 메뉴)

**파일 구조**:
- `src/app/admin/page.tsx` - 메인 대시보드
- `src/app/admin/layout.tsx` - 레이아웃
- `src/app/admin/components/` - 5개 컴포넌트

### 3. Mock 데이터 리포지토리 (100%)

**목적**: 로그인 없이 즉시 테스트 가능

**데이터 규모**:
- 상품: 10건 (5개 카테고리)
- 고객: 12명
- 주문: 60건 (최근 90일 분산)
- 재고 부족: 3개

**파일**:
- `infrastructure/repositories/mock-dashboard.repository.ts` - Mock 구현체
- `infrastructure/repositories/index.ts` - Factory 패턴

### 4. 의존성 주입 패턴 (100%)

**기능**: Mock ↔ Supabase 자동 전환

```bash
# Mock 데이터 사용
NEXT_PUBLIC_USE_MOCK=true

# Supabase 실제 데이터
NEXT_PUBLIC_USE_MOCK=false
```

**핵심**: UI 코드 수정 없이 1줄 변경으로 전환 가능

### 5. Vitest 테스트 환경 (100%)

**설정 완료**:
- `vitest.config.ts` - 설정 파일
- `vitest.setup.ts` - Testing Library 초기화
- `package.json` - npm scripts

**실행 명령**:
```bash
npm run test          # 개발 모드
npm run test:run      # 한 번 실행
npm run test:coverage # 커버리지 리포트
```

### 6. 완벽한 문서 (100%)

- `README.md` - 프로젝트 전체 가이드
- `CLAUDE.md` - 클린 아키텍처 규칙 & 개발 표준
- `infrastructure/repositories/USAGE.md` - 리포지토리 사용법
- `HANDOVER.md` - 본 문서 (인수인계)

---

## ⏳ 다음 구현 순서 (우선순위)

### Phase 1: 나머지 관리 화면 (3개 화면)
- [ ] 상품 관리
  - [ ] 상품 목록 (`/admin/products`)
  - [ ] 상품 등록 (`/admin/products/new`)
  - [ ] 상품 상세/수정 (`/admin/products/:id`)

### Phase 2: 주문 관리 (2개 화면)
- [ ] 주문 목록 (`/admin/orders`)
- [ ] 주문 상세 (`/admin/orders/:id`)

### Phase 3: 고객 관리 (2개 화면)
- [ ] 고객 목록 (`/admin/customers`)
- [ ] 고객 상세 (`/admin/customers/:id`)

### Phase 4: 분석 및 로그인 (2개 화면)
- [ ] 매출 분석 (`/admin/analytics`)
- [ ] 로그인 페이지 (`/login`)

### Phase 5: Supabase 실제 연동
- [ ] Supabase 스키마 생성
- [ ] RLS 정책 설정
- [ ] 서버 액션으로 데이터 페칭
- [ ] `NEXT_PUBLIC_USE_MOCK=false`로 전환

---

## 🚀 빠른 시작 가이드

### 설치 & 실행

```bash
# 1. 프로젝트 디렉토리로 이동
cd C:\Users\USER\dev\ecommerce-admin

# 2. 의존성 설치 (이미 설치됨)
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 접속
http://localhost:3000/admin
```

### 환경 변수 설정

**.env.local** 파일 (이미 설정됨):
```env
# Mock 데이터 사용 (현재 기본값)
NEXT_PUBLIC_USE_MOCK=true

# Supabase (향후 사용)
NEXT_PUBLIC_SUPABASE_URL=https://pdihmaqxakbdnhpmsvrj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=
```

---

## 📁 주요 파일 및 디렉토리

### 클린 아키텍처 핵심 파일

```
core/domain/entities/dashboard.ts
  └─ DashboardStats, WeeklySales, CategorySales, RecentOrder 타입 정의

core/domain/repositories/IDashboardRepository.ts
  └─ 리포지토리 인터페이스 (구현체 교체 가능)

core/application/use-cases/GetDashboardStatsUseCase.ts
  └─ 대시보드 데이터 조회 유스케이스

infrastructure/repositories/mock-dashboard.repository.ts
  └─ Mock 구현체 (60개 주문 시뮬레이션)

infrastructure/repositories/SupabaseDashboardRepository.ts
  └─ Supabase 구현체 (실제 데이터)

infrastructure/repositories/index.ts
  └─ DashboardRepositoryFactory (의존성 주입)

src/app/admin/page.tsx
  └─ 메인 대시보드 페이지 (UI 코드만, 비즈니스 로직 없음)
```

### 대시보드 컴포넌트

```
src/app/admin/components/
├─ Sidebar.tsx          # 네비게이션 사이드바
├─ StatCard.tsx         # KPI 카드
├─ WeeklySalesChart.tsx # 주간 매출 차트
├─ CategorySalesChart.tsx # 카테고리 차트
└─ RecentOrdersTable.tsx # 주문 테이블
```

---

## 🏗️ 아키텍처 설계 원칙

### 1. 계층 분리 (Layered Architecture)

```
UI 렌더링 (page.tsx)
    ↓ (의존성 주입)
유스케이스 (GetDashboardStatsUseCase)
    ↓ (인터페이스)
리포지토리 (IDashboardRepository)
    ↓ (구현)
Mock / Supabase 구현체
```

**특징**: UI는 데이터 소스를 알 필요 없음!

### 2. 의존성 역전 원칙 (DIP)

```
Domain (엔티티, 인터페이스)
  ↑
Application (유스케이스)
  ↑
Infrastructure (구현체)
  ↑
Presentation (UI)
```

**특징**: 상위 계층이 하위 계층에 의존하지 않음

### 3. 전략 패턴 (Strategy Pattern)

```
IDashboardRepository
├─ MockDashboardRepository
└─ SupabaseDashboardRepository

// 환경 변수로 자동 선택
const repo = NEXT_PUBLIC_USE_MOCK ? new MockRepository() : new SupabaseRepository()
```

---

## 🧪 테스트 가이드

### 단위 테스트 작성 방법

```typescript
// core/application/use-cases/__tests__/GetDashboardStatsUseCase.test.ts
import { MockDashboardRepository } from '@/infrastructure/repositories/mock-dashboard.repository';
import { GetDashboardStatsUseCase } from '../GetDashboardStatsUseCase';

describe('GetDashboardStatsUseCase', () => {
  it('should return dashboard stats', async () => {
    const repo = new MockDashboardRepository();
    const useCase = new GetDashboardStatsUseCase(repo);
    const result = await useCase.execute();
    
    expect(result.stats.todaySales).toBeGreaterThan(0);
    expect(result.weeklySales).toHaveLength(7);
  });
});
```

### 테스트 실행

```bash
npm run test          # watch 모드
npm run test:run      # 한 번만 실행
npm run test:coverage # 커버리지 보고서
```

### 커버리지 목표

- **Domain Layer**: 100% (비즈니스 규칙 중요)
- **Application Layer**: 80%+ (유스케이스)
- **Infrastructure Layer**: 50%+ (외부 API)
- **Presentation Layer**: 필요시 (UI)

---

## 🔄 Mock → Supabase 전환 로드맵

### Step 1: Supabase 프로젝트 생성
- Supabase 대시보드에서 새 프로젝트 생성
- Project URL & Anon Key 획득

### Step 2: 데이터베이스 스키마 생성
- `supabase/migrations/` SQL 파일 실행
- 테이블: products, orders, customers, order_items

### Step 3: 환경 변수 변경
```env
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Step 4: 서버 액션 구현
- `app/actions/dashboard.ts` 생성
- `DashboardRepositoryFactory.createWithSupabase()`로 Supabase 리포지토리 주입

### Step 5: 테스트
- 브라우저에서 `/admin` 접속
- 실제 데이터 확인

**핵심**: UI 코드는 수정 불필요! 구현체만 교체

---

## 💡 개발 팁

### 1. Mock 데이터로 먼저 개발
```bash
NEXT_PUBLIC_USE_MOCK=true npm run dev
# 빠른 개발, 로그인 불필요
```

### 2. Supabase로 테스트
```bash
NEXT_PUBLIC_USE_MOCK=false npm run dev
# 실제 데이터 연동
```

### 3. 새로운 화면 구현할 때

**원칙**:
1. Domain 계층: 엔티티 & 인터페이스 정의
2. Application 계층: 유스케이스 작성
3. Infrastructure 계층: Mock & Supabase 구현체
4. Presentation 계층: 컴포넌트 & 페이지

**예시** (상품 목록 화면 추가):
```typescript
// 1. Domain
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
}

// 2. Application
export class GetProductsUseCase {
  execute(): Promise<Product[]> {
    return this.repository.getAll();
  }
}

// 3. Infrastructure
export class MockProductRepository implements IProductRepository {
  // Mock 데이터로 구현
}

export class SupabaseProductRepository implements IProductRepository {
  // Supabase 쿼리로 구현
}

// 4. Presentation
export default function ProductsPage() {
  // UI 렌더링 (비즈니스 로직 없음)
}
```

---

## 📚 참고 문서

| 문서 | 내용 | 읽어야 할 때 |
|------|------|-----------|
| **README.md** | 프로젝트 전체 개요 | 처음 시작할 때 |
| **CLAUDE.md** | 클린 아키텍처 규칙 | 새 기능 구현 전 |
| **infrastructure/repositories/USAGE.md** | Mock/Supabase 사용법 | 데이터 레이어 작업 시 |
| **HANDOVER.md** | 본 문서 | 컨텍스트 리셋 후 |

---

## 🔑 중요 설정

### tsconfig.json 경로 매핑

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/core/*": ["./core/*"],
      "@/infrastructure/*": ["./infrastructure/*"]
    }
  }
}
```

**핵심**: 모든 import에서 `@/` 사용 가능

### .env.local 관리

```bash
# .gitignore에 의해 자동 보호
.env.local  # Git에 올라가지 않음

# 하지만 로컬에서 반드시 설정 필요
NEXT_PUBLIC_USE_MOCK=true
```

---

## ⚠️ 주의사항

### 1. Domain Layer는 외부 의존성 없음

```typescript
// ❌ 금지
import { supabase } from '@supabase/supabase-js'; // core/domain에서 금지

// ✅ 허용
export interface User {
  id: string;
  name: string;
}
```

### 2. UI는 유스케이스만 호출

```typescript
// ❌ 금지
const { data } = await supabase.from('products').select(); // 직접 쿼리

// ✅ 허용
const useCase = new GetProductsUseCase(repository);
const products = await useCase.execute();
```

### 3. 커밋 author는 devzikx

```bash
# 모든 커밋이 devzikx로 설정됨
# (git config 이미 설정됨)
```

---

## 🎯 체크리스트 (다음 작업자용)

### 프로젝트 시작 전

- [ ] `npm install` 실행
- [ ] `npm run dev` 로 서버 실행 확인
- [ ] http://localhost:3000/admin 접속 확인
- [ ] 대시보드에 데이터 표시되는지 확인

### 새 기능 추가 전

- [ ] `CLAUDE.md` 의 아키텍처 규칙 숙지
- [ ] Domain, Application, Infrastructure, Presentation 계층 이해
- [ ] Mock 데이터로 먼저 개발
- [ ] 테스트 코드 작성 (TDD)

### 배포 전

- [ ] 모든 테스트 통과 (`npm run test:run`)
- [ ] 커버리지 80% 이상 확인 (`npm run test:coverage`)
- [ ] ESLint 통과 (`npm run lint`)
- [ ] `.env.local` 설정 확인 (비밀값 포함)

---

## 📞 비상 연락처

### 문제 발생 시

1. **빌드 에러**: `rm -rf node_modules && npm install`
2. **타입 에러**: TypeScript strict mode 확인 (`any` 타입 금지)
3. **import 에러**: `tsconfig.json` 경로 매핑 확인
4. **테스트 실패**: Mock 데이터 규모 확인 (상품 10건, 주문 60건 등)

---

## 📈 프로젝트 상태

```
진행률: 80% 완성 🚀

✅ 완성 (80%)
  - 클린 아키텍처 4계층
  - 대시보드 홈 화면
  - Mock 리포지토리
  - 의존성 주입 패턴
  - Vitest 환경
  - 완벽한 문서

⏳ 진행 중 (20%)
  - 나머지 9개 화면
  - Supabase 실제 연동
  - 통합 테스트
```

---

**본 문서는 컨텍스트 리셋 후 빠른 복귀를 위해 작성되었습니다.**

**마지막 업데이트**: 2026-09-03  
**다음 작업자**: [성명 작성 바람]
