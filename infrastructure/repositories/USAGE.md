# Dashboard Repository 사용 가이드

## 📋 개요

이 디렉토리는 `IDashboardRepository` 인터페이스의 2가지 구현체를 제공합니다:

- **MockDashboardRepository** (`mock-dashboard.repository.ts`) - 로그인 없이 개발 테스트용
- **SupabaseDashboardRepository** (`SupabaseDashboardRepository.ts`) - 실제 데이터베이스 연동

## 🔄 리포지토리 전환

### 환경 변수 설정 (.env.local)

```env
# Mock 데이터 사용 (로그인 불필요)
NEXT_PUBLIC_USE_MOCK=true

# Supabase 실제 데이터 사용
NEXT_PUBLIC_USE_MOCK=false
```

### 의존성 주입 (Factory Pattern)

```typescript
import { DashboardRepositoryFactory } from '@/infrastructure/repositories';

// 환경 변수에 따라 자동 선택
const repository = DashboardRepositoryFactory.create();
```

또는 Supabase 클라이언트와 함께:

```typescript
import { createClient } from '@supabase/supabase-js';
import { DashboardRepositoryFactory } from '@/infrastructure/repositories';

const supabase = createClient(url, key);
const repository = DashboardRepositoryFactory.createWithSupabase(supabase);
```

## 📊 Mock 데이터 사양

### 상품 (10건)

| 이름 | 카테고리 | 가격 | 재고 |
|-----|---------|------|------|
| 프리미엄 기계식 키보드 | 전자제품 | 189,000 | 35 |
| 클린 아키텍처 머그컵 | 생활용품 | 18,000 | 120 |
| 노이즈 캔슬링 무선 헤드폰 | 전자제품 | 299,000 | 4 |
| 오버핏 데님 자켓 | 의류 | 89,000 | 0 |
| 수분 진정 크림 50ml | 화장품 | 32,000 | 58 |
| 4K 웹캠 프로 | 전자제품 | 129,000 | 22 |
| 유기농 드립백 커피 30개입 | 식품 | 24,000 | 3 |
| 캐시미어 혼방 니트 | 의류 | 79,000 | 41 |
| 스테인리스 텀블러 500ml | 생활용품 | 26,000 | 87 |
| 비타민C 브라이트닝 세럼 | 화장품 | 45,000 | 2 |

### 고객 (12명)

- 김철수, 이영희, 박지성, 최유리, 정민호, 한소희
- 오준석, 윤서연, 장하늘, 임도현, 신아름, 배준영

### 주문 (60건)

- 생성 시기: 최근 90일에 분산
- 상태: `payment_pending`, `payment_completed`, `preparing`, `shipping`, `delivered`, `cancelled`
- 항목당 상품: 1~3개

### 카테고리별 매출

- 전자제품 (가장 높음)
- 의류
- 생활용품
- 화장품
- 식품

## 🧪 테스트 예제

### 서버 액션으로 리포지토리 주입

```typescript
// app/actions/dashboard.ts
'use server';

import { DashboardRepositoryFactory } from '@/infrastructure/repositories';
import { GetDashboardStatsUseCase } from '@/core/application/use-cases/GetDashboardStatsUseCase';

export async function getDashboardData() {
  const repository = DashboardRepositoryFactory.create();
  const useCase = new GetDashboardStatsUseCase(repository);
  return useCase.execute();
}
```

### 클라이언트 컴포넌트에서 사용

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getDashboardData } from './actions/dashboard';
import type { DashboardData } from '@/core/application/use-cases/GetDashboardStatsUseCase';

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    getDashboardData().then(setData);
  }, []);

  // UI 렌더링...
}
```

## ✅ 장점

### MockDashboardRepository

- ✅ Supabase 계정 없이도 개발 가능
- ✅ 네트워크 요청 없음 (빠름)
- ✅ 재현 가능한 데이터
- ✅ 로그인 불필요
- ✅ CI/CD 테스트에 유용

### SupabaseDashboardRepository

- ✅ 실제 데이터 조회
- ✅ 사용자별 RLS 정책 적용
- ✅ 실시간 데이터 반영
- ✅ 프로덕션 환경과 동일한 동작

## 🔄 마이그레이션 경로

개발 → 테스트 → 프로덕션

1. **개발 단계**: `NEXT_PUBLIC_USE_MOCK=true` (Mock 사용)
2. **테스트 단계**: Supabase 스테이징 환경 (실제 데이터)
3. **프로덕션**: `NEXT_PUBLIC_USE_MOCK=false` (Supabase 프로덕션)

---

**핵심**: UI와 유스케이스는 수정하지 않고, 리포지토리 구현체만 교체하여 동작합니다! 🎯
