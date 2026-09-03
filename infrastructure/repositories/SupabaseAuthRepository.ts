import { AuthCredentials, LoginResponse, User } from '@/core/domain/entities/user';
import { IAuthRepository } from '@/core/domain/repositories/IAuthRepository';
import { createBrowserClient } from '@supabase/ssr';

export class SupabaseAuthRepository implements IAuthRepository {
  private supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async login(credentials: AuthCredentials): Promise<LoginResponse> {
    // Supabase Auth로 로그인
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error || !data.user) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    // users 테이블에서 사용자 정보 조회
    const { data: userData, error: userError } = await this.supabase
      .from('users')
      .select('id, email, role')
      .eq('id', data.user.id)
      .single();

    if (userError || !userData) {
      throw new Error('사용자 정보를 찾을 수 없습니다');
    }

    const user: User = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      createdAt: new Date(),
    };

    return {
      user,
      token: data.session?.access_token || '',
    };
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();

    if (!data.user) {
      return null;
    }

    const { data: userData } = await this.supabase
      .from('users')
      .select('id, email, role')
      .eq('id', data.user.id)
      .single();

    if (!userData) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      createdAt: new Date(),
    };
  }

  isAdmin(user: User): boolean {
    return user.role === 'admin';
  }
}
