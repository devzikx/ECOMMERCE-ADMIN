import { AuthCredentials, LoginResponse } from '@/core/domain/entities/user';
import { IAuthRepository } from '@/core/domain/repositories/IAuthRepository';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: AuthCredentials): Promise<LoginResponse> {
    if (!credentials.email?.trim()) {
      throw new Error('이메일을 입력해주세요');
    }
    if (!credentials.password?.trim()) {
      throw new Error('비밀번호를 입력해주세요');
    }

    const response = await this.authRepository.login(credentials);

    if (!this.authRepository.isAdmin(response.user)) {
      throw new Error('관리자 계정으로 로그인해주세요');
    }

    return response;
  }
}
