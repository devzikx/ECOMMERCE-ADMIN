export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
