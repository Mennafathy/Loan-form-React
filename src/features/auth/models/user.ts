export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'borrower' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
