import {
  AuthCredentials,
  LoginResponse,
  User,
} from '@/core/domain/entities/user';
import { IAuthRepository } from '@/core/domain/repositories/IAuthRepository';

const MOCK_ADMIN_USER: User = {
  id: 'admin-001',
  email: 'admin@example.com',
  role: 'admin',
  createdAt: new Date('2024-01-01'),
};

const MOCK_REGULAR_USER: User = {
  id: 'user-001',
  email: 'user@example.com',
  role: 'user',
  createdAt: new Date('2024-01-02'),
};

let currentUser: User | null = null;

export class MockAuthRepository implements IAuthRepository {
  async login(credentials: AuthCredentials): Promise<LoginResponse> {
    // Mock 로그인: admin@example.com으로 로그인하면 성공
    if (
      credentials.email === 'admin@example.com' &&
      credentials.password === 'password123'
    ) {
      currentUser = MOCK_ADMIN_USER;
      return {
        user: MOCK_ADMIN_USER,
        token: 'mock-admin-token-' + Date.now(),
      };
    }

    // 일반 사용자로도 로그인 가능 (테스트용)
    if (
      credentials.email === 'user@example.com' &&
      credentials.password === 'password123'
    ) {
      currentUser = MOCK_REGULAR_USER;
      return {
        user: MOCK_REGULAR_USER,
        token: 'mock-user-token-' + Date.now(),
      };
    }

    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다');
  }

  async logout(): Promise<void> {
    currentUser = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return currentUser;
  }

  isAdmin(user: User): boolean {
    return user.role === 'admin';
  }
}
