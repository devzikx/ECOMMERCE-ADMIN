# 쇼핑몰 관리자 대시보드 (E-Commerce Admin Dashboard)

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Testing](https://img.shields.io/badge/Testing-Vitest-green?logo=vitest)

프로젝트 전체를 통한 엔드-투-엔드 쇼핑몰 관리자 대시보드입니다. **클린 아키텍처** 원칙을 엄격히 따르며, 테스트 주도 개발(TDD)을 기반으로 합니다.

---

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [Mock 데이터 (로그인 불필요)](#mock-데이터-로그인-불필요)
- [개발 가이드](#개발-가이드)
- [테스트](#테스트)
- [배포](#배포)

---

## 🎯 프로젝트 개요

본 프로젝트는 다음을 목표로 합니다:

- **관리자 대시보드 제공**: 상품, 주문, 고객, 분석 데이터를 한눈에 관리
- **클린 아키텍처 준수**: 4계층 분리를 통한 높은 유지보수성 및 확장성
- **완전한 테스트 커버리지**: 비즈니스 로직에 대한 80% 이상의 단위/통합 테스트
- **타입 안전성**: TypeScript strict mode를 통한 런타임 에러 최소화
- **Supabase 기반 백엔드**: PostSQL 데이터베이스, 인증, 스토리지를 통합

---

## ✨ 주요 기능

### 1. 관리자 인증 (Admin Authentication)
- ✅ **Mock 모드**: 로그인 불필요 (현재)
- Supabase Auth를 통한 안전한 세션 관리 (프로덕션)
- `role='admin'` 역할 기반 접근 제어(RBAC)

### 2. 상품 관리 (Product Management)
- 상품 목록 조회 및 검색
- 상품 등록/수정 (이미지 업로드 포함)
- 재고 추적 및 카테고리별 분류

### 3. 주문 관리 (Order Management)
- 전체 주문 현황 대시보드
- 주문 상태 추적 (대기, 처리, 배송, 완료)
- 주문 상세 정보 및 항목별 내역

### 4. 고객 관리 (Customer Management)
- 고객 정보 조회
- 고객별 주문 이력 추적
- 고객 세분화 및 분석

### 5. 판매 분석 (Analytics)
- 실시간 매출 차트 (월간, 주간, 일일)
- 상품별 판매량 분석
- 카테고리별 매출 비율

---

## 🛠️ 기술 스택

### 핵심 프레임워크
- **Next.js 16** - App Router, SSR/SSG, API Routes
- **React 19** - 컴포넌트 기반 UI
- **TypeScript 5** - Strict Mode

### 데이터 & 상태 관리
- **Supabase** - PostgreSQL, Auth, Storage
  - `@supabase/supabase-js` - 클라이언트 SDK
  - `@supabase/ssr` - 서버 사이드 렌더링 최적화
- **TanStack React Form** - 폼 상태 관리
- **Zod** - 런타임 타입 검증

### UI & 스타일링
- **Tailwind CSS 4** - 유틸리티 기반 CSS
- **Lucide React** - 아이콘 라이브러리
- **Recharts** - 반응형 차트 라이브러리

### 테스트
- **Vitest** - 단위/통합 테스트
- **Testing Library** - React 컴포넌트 테스트
- **Coverage** - 코드 커버리지 분석

### 개발 도구
- **ESLint** - 코드 품질 검사
- **PostCSS** - CSS 트랜스파일러

---

## 📁 프로젝트 구조

```
ecommerce-admin/
├── core/                          # 비즈니스 로직 (프레임워크 독립)
│   ├── domain/                    # 1계층: 엔티티 & 인터페이스
│   │   ├── entities/              # 데이터 엔티티 타입 정의
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Order.ts
│   │   │   └── Customer.ts
│   │   └── repositories/          # 리포지토리 인터페이스
│   │       ├── IProductRepository.ts
│   │       ├── IOrderRepository.ts
│   │       ├── ICustomerRepository.ts
│   │       └── IUserRepository.ts
│   └── application/               # 2계층: 유스케이스
│       └── use-cases/             # 비즈니스 로직 조율
│           ├── GetDashboardStatsUseCase.ts
│           ├── CreateProductUseCase.ts
│           ├── GetProductsUseCase.ts
│           ├── GetOrdersUseCase.ts
│           ├── UpdateOrderStatusUseCase.ts
│           ├── GetCustomersUseCase.ts
│           └── GetAnalyticsUseCase.ts
│
├── infrastructure/                # 3계층: 외부 연동 & 구현체
│   ├── supabase/                  # Supabase 클라이언트 & 헬퍼
│   │   ├── supabaseClient.ts      # 클라이언트 생성
│   │   ├── serverClient.ts        # 서버 사이드 클라이언트
│   │   ├── auth.ts                # 인증 헬퍼
│   │   ├── storage.ts             # 스토리지 헬퍼
│   │   └── RLS.sql                # 행 수준 보안 정책
│   └── repositories/              # 리포지토리 구현체
│       ├── SupabaseProductRepository.ts
│       ├── SupabaseOrderRepository.ts
│       ├── SupabaseCustomerRepository.ts
│       └── SupabaseUserRepository.ts
│
├── src/                           # 4계층: Next.js 프레젠테이션
│   ├── app/
│   │   ├── globals.css            # 전역 스타일
│   │   ├── layout.tsx             # 루트 레이아웃
│   │   ├── (auth)/                # 인증 레이아웃 그룹
│   │   │   └── login/
│   │   │       ├── page.tsx
│   │   │       └── components/
│   │   │           └── LoginForm.tsx
│   │   └── admin/                 # 관리자 대시보드
│   │       ├── layout.tsx         # 대시보드 레이아웃 (사이드바, 헤더)
│   │       ├── page.tsx           # 대시보드 홈 (통계/차트)
│   │       ├── components/        # 공유 컴포넌트
│   │       │   ├── Sidebar.tsx
│   │       │   ├── Header.tsx
│   │       │   └── StatCard.tsx
│   │       ├── products/          # 상품 관리 (3개 화면)
│   │       │   ├── page.tsx       # 상품 목록
│   │       │   ├── [id]/          # 상품 상세/수정
│   │       │   │   └── page.tsx
│   │       │   ├── new/           # 상품 신규 등록
│   │       │   │   └── page.tsx
│   │       │   └── components/
│   │       │       ├── ProductForm.tsx
│   │       │       ├── ProductTable.tsx
│   │       │       └── ImageUpload.tsx
│   │       ├── orders/            # 주문 관리 (2개 화면)
│   │       │   ├── page.tsx       # 주문 목록
│   │       │   ├── [id]/          # 주문 상세
│   │       │   │   └── page.tsx
│   │       │   └── components/
│   │       │       ├── OrderTable.tsx
│   │       │       └── OrderDetail.tsx
│   │       ├── customers/         # 고객 관리 (2개 화면)
│   │       │   ├── page.tsx       # 고객 목록
│   │       │   ├── [id]/          # 고객 상세
│   │       │   │   └── page.tsx
│   │       │   └── components/
│   │       │       └── CustomerTable.tsx
│   │       └── analytics/         # 판매 분석 (1개 화면)
│   │           ├── page.tsx       # 분석 대시보드
│   │           └── components/
│   │               ├── RevenueChart.tsx
│   │               ├── ProductChart.tsx
│   │               └── CategoryChart.tsx
│   └── lib/                       # 유틸 함수
│       └── utils.ts               # 헬퍼 함수
│
├── public/                        # 정적 자산 (이미지, 폰트 등)
│
├── CLAUDE.md                      # 프로젝트 개발 규칙 및 아키텍처 가이드
├── package.json                   # 의존성 명세
├── tsconfig.json                  # TypeScript 설정
├── vitest.config.ts               # Vitest 설정
├── vitest.setup.ts                # Vitest 셋업 (Testing Library)
├── next.config.ts                 # Next.js 설정
├── tailwind.config.ts             # Tailwind CSS 설정
└── README.md                      # 본 문서

```

### 계층별 역할 (4-Tier Clean Architecture)

| 계층 | 디렉토리 | 책임 | 의존성 |
|------|---------|------|--------|
| **1. Domain** | `core/domain/` | 엔티티, 비즈니스 규칙, 인터페이스 | ❌ 외부 라이브러리 금지 |
| **2. Application** | `core/application/` | 유스케이스, 비즈니스 로직 조율 | `core/domain` |
| **3. Infrastructure** | `infrastructure/` | Supabase, 외부 API, 구현체 | `core/` + 외부 라이브러리 |
| **4. Presentation** | `src/app/` | UI, 라우팅, 컴포넌트 | `core/application` + 외부 UI 라이브러리 |

---

## 🚀 시작하기

### 사전 요구사항

- **Node.js** 18+
- **npm** 또는 **yarn**
- **Supabase 계정** 및 프로젝트

### 1. 저장소 클론

```bash
git clone <repository-url>
cd ecommerce-admin
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 다음을 입력합니다:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SECRET_KEY=your_service_role_key_here

# (선택) LangChain AI 기능
ANTHROPIC_API_KEY=your_anthropic_key_here
```

### 4. 데이터베이스 초기화 (Supabase)

Supabase 대시보드에서 다음 SQL을 실행합니다:

```sql
-- users 테이블 (admin role 관리)
create table public.users (
  id uuid primary key references auth.users (id),
  email text unique not null,
  role text not null default 'user',
  created_at timestamp with time zone default now()
);

-- Row Level Security (RLS)
alter table public.users enable row level security;

-- products, orders, customers, order_items 등 추가 테이블 정의
-- infrastructure/supabase/RLS.sql 참조
```

더 자세한 스키마는 `infrastructure/supabase/RLS.sql`을 참고하세요.

### 5. 개발 서버 시작

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열고 로그인 페이지에서 시작합니다.

---

## 📦 Mock 데이터 (로그인 불필요)

### 🎯 목적

개발 초기 단계에서 **Supabase 계정 없이도** 대시보드를 테스트할 수 있도록 Mock 데이터를 제공합니다.

### ✅ 현재 상태

```
✅ NEXT_PUBLIC_USE_MOCK=true (기본값)
✅ 로그인 불필요
✅ http://localhost:3000/admin 즉시 접속 가능
```

### 📊 Mock 데이터 규모

| 항목 | 수량 | 설명 |
|------|------|------|
| **상품** | 10건 | 5개 카테고리 (전자제품, 의류, 화장품, 생활용품, 식품) |
| **고객** | 12명 | 김철수, 이영희, 박지성, 최유리, 정민호, 한소희 등 |
| **주문** | 60건 | 최근 90일에 분산, 다양한 상태 (배송완료, 배송중, 준비중 등) |
| **재고 부족** | 3개 | stock < 10인 상품 |

### 🔄 Mock ↔ Supabase 전환

#### Mock 데이터 사용 (현재)

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=true

# 개발 시작
npm run dev
# → http://localhost:3000/admin (로그인 불필요)
```

#### Supabase 실제 데이터 사용

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=false

# Supabase 키 설정
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# 개발
npm run dev
# → Supabase에서 실제 데이터 로드
```

### 🏗️ Mock 리포지토리 구조

```
infrastructure/repositories/
├── mock-dashboard.repository.ts    # Mock 구현체
├── SupabaseDashboardRepository.ts  # Supabase 구현체
└── index.ts                        # Factory (자동 선택)
```

**특징**: UI 코드 수정 없이 리포지토리만 교체하여 동작합니다! (전략 패턴)

### 📋 Mock 데이터 예시

#### 상품 (10건)
```
1. 프리미엄 기계식 키보드     (전자제품, 189,000원, 재고 35)
2. 클린 아키텍처 머그컵       (생활용품, 18,000원, 재고 120)
3. 노이즈 캔슬링 무선 헤드폰   (전자제품, 299,000원, 재고 4) ⚠️ 부족
4. 오버핏 데님 자켓           (의류, 89,000원, 재고 0) ⚠️ 품절
5. 수분 진정 크림 50ml        (화장품, 32,000원, 재고 58)
... 총 10건
```

#### 주문 상태 분포
```
배송완료 (Delivered)    - 40%  ← KPI에 카운트
배송중   (Shipping)     - 20%
준비중   (Preparing)    - 15%
결제대기 (Payment Pending) - 15%
취소     (Cancelled)    - 10%
```

#### 주간 매출 추이 (AreaChart)
```
Sun: 450,000
Mon: 620,000
Tue: 580,000
Wed: 720,000
Thu: 890,000
Fri: 1,200,000  ← 최고점
Sat: 950,000
```

### 🔧 자세한 사용법

더 자세한 내용은 `infrastructure/repositories/USAGE.md`를 참조하세요.

---

## 📚 개발 가이드

### 클린 아키텍처 준수 규칙

#### ✅ Domain Layer (`core/domain/`)

```typescript
// ❌ 금지: 외부 라이브러리 import
import { supabase } from '@supabase/supabase-js'; // ❌
import { NextApiRequest } from 'next'; // ❌

// ✅ 권장: 순수 TypeScript 타입
export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  create(product: CreateProductDTO): Promise<Product>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}
```

#### ✅ Application Layer (`core/application/`)

```typescript
// 유스케이스: 비즈니스 로직 조율
export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(filter?: ProductFilter): Promise<Product[]> {
    const products = await this.productRepository.getAll();
    return filter ? this.filterProducts(products, filter) : products;
  }

  private filterProducts(products: Product[], filter: ProductFilter): Product[] {
    // 필터링 로직
  }
}
```

#### ✅ Infrastructure Layer (`infrastructure/`)

```typescript
// Supabase를 통한 인터페이스 구현
export class SupabaseProductRepository implements IProductRepository {
  constructor(private client: SupabaseClient) {}

  async getAll(): Promise<Product[]> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch products: ${error.message}`);
    return data || [];
  }
}
```

#### ✅ Presentation Layer (`src/app/`)

```typescript
'use client'; // 클라이언트 컴포넌트 명시

import { useState, useEffect } from 'react';
import { GetProductsUseCase } from '@/core/application/use-cases';
import { supabaseClient } from '@/infrastructure/supabase/client';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const repository = new SupabaseProductRepository(supabaseClient);
    const useCase = new GetProductsUseCase(repository);

    useCase.execute().then(setProducts);
  }, []);

  return (
    <div>
      {products.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
```

### 폼 검증 (TanStack Form + Zod)

```typescript
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
});

export function ProductForm() {
  const form = useForm({
    defaultValues: { name: '', price: 0, stock: 0 },
    onSubmit: async ({ value }) => {
      // 제출 로직
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <form.Field name="name" validators={[productSchema.shape.name]}>
        {field => (
          <div>
            <input
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <span className="text-red-500">{field.state.meta.errors[0]}</span>
            )}
          </div>
        )}
      </form.Field>
    </form>
  );
}
```

### Supabase 사용 (클라이언트 vs 서버)

#### 클라이언트 사이드

```typescript
// src/app/admin/products/page.tsx
'use client';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Products() {
  // 클라이언트 로직
}
```

#### 서버 사이드 (쿠키 기반 인증)

```typescript
// src/app/api/products/route.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        // ... 기타 설정
      },
    }
  );

  const { data } = await supabase.from('products').select('*');
  return Response.json(data);
}
```

---

## 🧪 테스트

### 단위 테스트 작성 (Vitest)

```typescript
// core/application/use-cases/__tests__/GetProductsUseCase.test.ts
import { describe, it, expect, vi } from 'vitest';
import { GetProductsUseCase } from '../GetProductsUseCase';
import { IProductRepository } from '@/core/domain/repositories';

describe('GetProductsUseCase', () => {
  it('should return all products from repository', async () => {
    // Arrange (준비)
    const mockRepository: IProductRepository = {
      getAll: vi.fn().mockResolvedValue([
        { id: '1', name: 'Product 1', price: 100, stock: 10 },
        { id: '2', name: 'Product 2', price: 200, stock: 20 },
      ]),
    };
    const useCase = new GetProductsUseCase(mockRepository);

    // Act (실행)
    const result = await useCase.execute();

    // Assert (검증)
    expect(result).toHaveLength(2);
    expect(mockRepository.getAll).toHaveBeenCalled();
  });
});
```

### 테스트 실행

```bash
# 개발 모드 (watch)
npm run test

# 한 번 실행
npm run test:run

# 커버리지 리포트 생성
npm run test:coverage
```

### 테스트 커버리지 목표

- **Domain Layer**: 100% (비즈니스 규칙)
- **Application Layer**: 80% 이상 (유스케이스)
- **Infrastructure Layer**: 50% 이상 (외부 API 모킹)
- **Presentation Layer**: 필요시만 (컴포넌트 통합 테스트)

---

## 🌐 주요 10개 화면 (10 Admin Screens)

1. **로그인** (`/login`) - 관리자 인증
2. **대시보드** (`/admin`) - 통계 및 주요 지표
3. **상품 목록** (`/admin/products`) - 전체 상품 조회
4. **상품 신규 등록** (`/admin/products/new`) - 상품 추가
5. **상품 상세/수정** (`/admin/products/:id`) - 상품 정보 수정
6. **주문 목록** (`/admin/orders`) - 전체 주문 조회
7. **주문 상세** (`/admin/orders/:id`) - 주문 정보 및 상태 변경
8. **고객 목록** (`/admin/customers`) - 전체 고객 조회
9. **고객 상세** (`/admin/customers/:id`) - 고객 정보 및 구매 이력
10. **판매 분석** (`/admin/analytics`) - 매출/판매량 차트

---

## 📊 데이터베이스 구조 (Database Schema)

### 핵심 테이블

| 테이블 | 설명 | 주요 컬럼 |
|--------|------|---------|
| `auth.users` | Supabase 인증 사용자 | `id`, `email`, `password_hash` |
| `public.users` | 관리자 role 정보 | `id`, `email`, `role` (admin/user) |
| `products` | 상품 정보 | `id`, `name`, `price`, `stock`, `category`, `image_url` |
| `orders` | 주문 정보 | `id`, `customer_id`, `status`, `total_amount`, `created_at` |
| `order_items` | 주문 항목 | `id`, `order_id`, `product_id`, `quantity`, `unit_price` |
| `customers` | 고객 정보 | `id`, `name`, `email`, `phone`, `address`, `created_at` |

자세한 스키마는 **Supabase 대시보드**에서 확인하거나, `infrastructure/supabase/RLS.sql` SQL 파일을 참고하세요.

---

## 🔒 보안 (Security & RLS)

### Row Level Security (RLS)

```sql
-- 관리자만 모든 데이터 조회 가능
create policy "Admins can read all data"
  on orders
  as select
  using (auth.uid() in (
    select id from public.users where role = 'admin'
  ));

-- 고객은 자신의 주문만 조회
create policy "Customers can read own orders"
  on orders
  as select
  using (customer_id = auth.uid());
```

### 환경 변수 관리

- ✅ **공개 가능** (`NEXT_PUBLIC_*`): Supabase URL, Anon Key
- ❌ **비밀** (`SUPABASE_SECRET_KEY`): 서버 코드에서만 사용

---

## 🚢 배포

### Vercel로 배포

```bash
# 리모트 저장소에 푸시
git push origin main

# Vercel에 자동 배포됨
# (또는 Vercel 대시보드에서 수동 배포)
```

### 환경 변수 설정 (Vercel)

1. Vercel 프로젝트 설정 → Environment Variables
2. 다음 환경 변수 추가:
   - `NEXT_PUBLIC_USE_MOCK=false` (프로덕션에서는 False)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SECRET_KEY`

### 데이터베이스 마이그레이션

배포 전 Supabase 프로덕션 환경에서 필요한 테이블과 RLS 정책을 생성합니다.

---

## 🤝 기여 가이드

1. **새로운 기능 개발**:
   - Red-Green-Refactor 사이클 준수
   - 먼저 실패하는 테스트 작성
   - CLAUDE.md 규칙 준수

2. **커밋 메시지 규칙**:
   ```
   feat: 상품 검색 기능 추가
   fix: 주문 상태 업데이트 버그 수정
   refactor: ProductForm 컴포넌트 간소화
   test: GetOrdersUseCase 단위 테스트 추가
   docs: README 업데이트
   ```

3. **Pull Request**:
   - 테스트 커버리지 80% 이상 유지
   - ESLint 통과
   - CLAUDE.md 규칙 준수 확인

---

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

---

## 📞 연락처 & 지원

질문이나 이슈가 있으면 GitHub Issues를 통해 보고해주세요.

---

## 📚 참고 링크

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [TanStack Form](https://tanstack.com/form)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)

---

---

## 🎯 진행 현황

| 구성 요소 | 상태 | 설명 |
|---------|------|------|
| **대시보드 홈** | ✅ 완성 | 4개 KPI, 2개 차트, 주문 테이블 |
| **Mock 데이터** | ✅ 완성 | 상품 10건, 고객 12명, 주문 60건 |
| **네비게이션** | ✅ 완성 | 6개 메뉴 (준비 상태) |
| **클린 아키텍처** | ✅ 준수 | Domain → Application → Infrastructure → Presentation |
| **테스트 환경** | ✅ 설정 | Vitest 기본 설정 완료 |
| **Supabase 연동** | ⏳ 대기 | 환경 변수 설정으로 전환 가능 |
| **나머지 9개 화면** | ⏳ 예정 | 상품/주문/고객/분석 관리 |

---

**최종 업데이트**: 2026-09-03

### 주요 변경사항 (이번 업데이트)

```
✅ Mock 대시보드 리포지토리 추가
   - infrastructure/repositories/mock-dashboard.repository.ts
   - SQL 마이그레이션과 동일한 데이터 규모

✅ 의존성 주입 팩토리 패턴 적용
   - infrastructure/repositories/index.ts
   - NEXT_PUBLIC_USE_MOCK으로 자동 전환

✅ 환경 변수 설정
   - .env.local에 NEXT_PUBLIC_USE_MOCK=true 추가
   - UI 코드 수정 없이 리포지토리만 교체

✅ README 완성
   - Mock 데이터 섹션 추가
   - 전환 가이드 추가
   - 진행 현황 표시
```

