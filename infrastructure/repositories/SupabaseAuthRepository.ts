import { AuthCredentials, LoginResponse, User } from '@/core/domain/entities/user';
import { IAuthRepository } from '@/core/domain/repositories/IAuthRepository';
import { createClient } from '@/lib/supabase/client';

export class SupabaseAuthRepository implements IAuthRepository {
  private supabaseClient: ReturnType<typeof createClient> | null = null;

  private getClient() {
    if (!this.supabaseClient) {
      this.supabaseClient = createClient();
    }
    return this.supabaseClient;
  }

  async login(credentials: AuthCredentials): Promise<LoginResponse> {
    const supabase = this.getClient();
    // Supabase Auth로 로그인
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error || !data.user) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    // users 테이블에서 사용자 정보 조회
    const { data: userData, error: userError } = await supabase
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
    const supabase = this.getClient();
    await supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const supabase = this.getClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return null;
    }

    const { data: userData } = await supabase
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
