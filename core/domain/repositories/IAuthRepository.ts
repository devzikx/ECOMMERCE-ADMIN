import { AuthCredentials, LoginResponse, User } from '../entities/user';

export interface IAuthRepository {
  login(credentials: AuthCredentials): Promise<LoginResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAdmin(user: User): boolean;
}
