import { SupabaseClient } from '@supabase/supabase-js';
import { IDashboardRepository } from '../../core/domain/repositories/IDashboardRepository';
import { SupabaseDashboardRepository } from './SupabaseDashboardRepository';
import { MockDashboardRepository } from './mock-dashboard.repository';

export class DashboardRepositoryFactory {
  static create(): IDashboardRepository {
    const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

    if (useMock) {
      console.log('📦 Using Mock Dashboard Repository');
      return new MockDashboardRepository();
    }

    // Supabase 리포지토리 생성 (클라이언트 제공 필요)
    // 이 코드는 서버 액션에서 호출되어야 함
    throw new Error(
      'Supabase Repository requires a SupabaseClient. Use MockDashboardRepository or provide a client.'
    );
  }

  static createWithSupabase(supabase: SupabaseClient): IDashboardRepository {
    const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

    if (useMock) {
      console.log('📦 Using Mock Dashboard Repository');
      return new MockDashboardRepository();
    }

    console.log('🔗 Using Supabase Dashboard Repository');
    return new SupabaseDashboardRepository(supabase);
  }
}
