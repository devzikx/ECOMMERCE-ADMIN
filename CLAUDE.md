# CLAUDE.md - 쇼핑몰 관리자 대시보드 프로젝트 지침

이 문서는 본 프로젝트의 최상위 아키텍처 규칙 및 개발 표준입니다. 모든 코드 생성 및 리팩토링 시 이 규칙을 최우선으로 준수해야 합니다.

---

## 1. 아키텍처 원칙: 클린 아키텍처 (Clean Architecture)

본 프로젝트는 의존성 역전 원칙(DIP)에 기반한 클린 아키텍처 4계층 구조를 엄격히 준수합니다.

```
프로젝트 루트/
├── core/
│   ├── domain/               # 1계층: 엔티티 및 비즈니스 규칙 (프레임워크 완전 독립)
│   │   ├── entities/         # User, Product, Order, Customer 엔티티 타입 정의
│   │   └── repositories/     # 리포지토리 인터페이스 정의 (IProductRepository 등)
│   └── application/          # 2계층: 유스케이스 및 비즈니스 로직 조율
│       └── use-cases/        # GetDashboardStatsUseCase, CreateProductUseCase 등
├── infrastructure/           # 3계층: 외부 연동 및 프레임워크 구현체
│   ├── supabase/             # Supabase Client 및 Auth/Storage 헬퍼
│   └── repositories/         # SupabaseProductRepository 등 리포지토리 구현체
└── src/
    └── app/                  # 4계층: Next.js App Router (프레젠테이션)
        ├── (auth)/login/     # 관리자 로그인 페이지
        └── admin/            # 관리자 대시보드 레이아웃 및 10대 화면
            ├── components/   # UI 컴포넌트, TanStack Form, Recharts 차트
            ├── products/     # 상품 목록 및 등록/수정
            ├── orders/       # 주문 목록 및 상세
            ├── customers/    # 고객 목록 및 상세
            └── analytics/    # 매출 분석
```

### 계층별 의존성 규칙 (Dependency Rule)
- `core/domain`은 어떠한 외부 라이브러리(Next.js, Supabase, React 등)에도 의존해서는 안 됩니다. 순수 TypeScript 인터페이스/타입만 포함합니다.
- `core/application`은 `core/domain`에만 의존하며, 유스케이스 단위 클래스/함수로 작성합니다.
- `infrastructure`는 `core`의 인터페이스를 구현하며, Supabase SDK나 외부 API를 다룹니다.
- `src/app` (Presentation)은 UI 렌더링에만 집중하고, 데이터 조작은 반드시 `application` 계층의 유스케이스를 호출하여 수행합니다.

---

## 2. 테스트 주도 개발 (TDD) 원칙

- **Red-Green-Refactor 사이클 강제**: 새로운 기능 구현 시 반드시 실패하는 Vitest 단위/통합 테스트를 먼저 작성합니다.
- **테스트 커버리지**: 비즈니스 로직(`core/application`, `core/domain`)의 단위 테스트 커버리지는 80% 이상을 유지합니다.
- **테스트 실행 명령**:
  - 단일 테스트: `npm run test -- <파일명>`
  - 전체 테스트: `npm run test:run`
  - 커버리지 확인: `npm run test:coverage`

---

## 3. 기술 스택 & 라이브러리 표준

- **Framework**: Next.js 16 App Router, TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, lucide-react (아이콘)
- **Backend & Auth & Storage**: Supabase (@supabase/supabase-js, @supabase/ssr)
  - 상품 이미지 버킷: `product-images` (Public Read, Authenticated Write)
  - 공개 키는 `process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY` 순으로 fallback 처리합니다.
  - Secret/Service Role 키(`SUPABASE_SECRET_KEY`)는 **서버 코드에서만** 참조하며, 절대 `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.
- **AI 어시스턴트 (선택 기능)**: `@langchain/core` + `@langchain/anthropic`, 모델 ID는 **`claude-haiku-4-5`** 고정
  - 구버전 ID(`claude-3-5-haiku-latest`)나 날짜 suffix(`claude-haiku-4-5-20251001`)를 쓰지 않습니다.
  - 공식 SDK(`@anthropic-ai/sdk`)를 직접 호출하지 않고 LangChain 인터페이스를 경유합니다. (제공자 교체 용이성)
  - AI 응답 형식은 문자열 파싱이 아니라 `model.withStructuredOutput(zodSchema)`로 강제합니다.
- **Form & Validation**: `@tanstack/react-form` + `zod`
  - 폼 입력 검증 시 반드시 Zod 스키마를 정의하고 인풋 필드별 인라인 에러 메시지를 표시합니다.
- **Charts**: `recharts` (ResponsiveContainer, AreaChart, BarChart, PieChart)
- **Testing**: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`

---

## 4. 코딩 컨벤션 & 품질 수칙

1. **Client vs Server 컴포넌트**:
   - 상태(`useState`), 폼 인터랙션, 차트(`recharts`), 드래그앤드롭이 있는 파일은 파일 최상단에 반드시 `'use client'`를 명시합니다.
2. **에러 핸들링**:
   - Supabase 호출 결과의 `error` 객체는 반드시 확인하고 사용자 친화적인 메시지로 변환합니다.
3. **타입 안전성**:
   - `any` 타입 사용을 엄격히 금지합니다. 모든 API 응답과 폼 데이터는 명시적 인터페이스/Zod 추론 타입을 사용합니다.
4. **diff 기반 수정**:
   - 기존 코드를 리팩토링할 때는 전체 파일을 덮어쓰지 않고 필요한 변경 부분만 최소한으로 수정합니다.

---

## 5. MCP (Model Context Protocol) 도구 활용 수칙

- **Supabase MCP** (`@supabase/mcp-server-supabase`): 스키마 구조 파악, 테이블 데이터 무결성 검증, RLS 정책 점검 시 활성화된 Supabase MCP 도구를 우선 호출하여 검증합니다.
- **Playwright MCP** (`@playwright/mcp`): 화면 구현 후 E2E 브라우저 동작 검증 및 시각적 UI 렌더링 확인 시 Playwright 브라우저 제어 도구를 활용하여 자동 검증 및 스크린샷을 생성합니다.
- MCP 서버가 연결되지 않은 상태라면 임의로 대체 수단을 만들지 말고 사용자에게 `/mcp` 연결 상태 확인을 요청합니다.

---

## 6. 데이터가 비어 보일 때의 1순위 점검 항목

관리자 화면의 목록/차트가 비어 있다면 **코드 버그보다 RLS 권한 문제일 가능성이 높습니다.**
아래를 먼저 확인한 뒤 코드를 수정합니다.

1. 현재 로그인 세션이 존재하는가? (`supabase.auth.getUser()`)
2. `public.users`에서 해당 사용자의 `role`이 `'admin'`인가?
   ```sql
   select id, email, role from public.users where role = 'admin';
   ```
3. `orders` / `customers` / `order_items`는 `public.is_admin()` 정책으로 **관리자에게만** 노출됩니다.
   비관리자 세션에서는 빈 배열이 반환되며 **에러가 발생하지 않으므로** 조용히 실패합니다.
4. 서버 컴포넌트에서 쿠키 기반 세션을 넘기지 않고 클라이언트를 생성하면 익명 세션이 됩니다.
   `@supabase/ssr`의 서버 클라이언트를 사용했는지 확인합니다.