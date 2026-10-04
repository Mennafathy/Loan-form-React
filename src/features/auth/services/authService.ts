import { User, AuthState } from '../models/user';
import { STORAGE_KEYS } from '@/config/constants';
import { storageService } from '@/services/storage/storageService';

const DEMO_USER: User = {
  id: 'usr_sarah_jenkins',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@example.com',
  role: 'borrower',
};

export const authService = {
  getCurrentSession(): AuthState {
    const token = storageService.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, 'demo-jwt-token-123');
    const user = storageService.get<User | null>(STORAGE_KEYS.USER_DATA, DEMO_USER);

    return {
      user,
      token,
      isAuthenticated: Boolean(user && token),
    };
  },

  async login(email: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const user: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: 'borrower',
    };

    storageService.set(STORAGE_KEYS.AUTH_TOKEN, 'demo-jwt-token-' + Date.now());
    storageService.set(STORAGE_KEYS.USER_DATA, user);

    return user;
  },

  logout(): void {
    storageService.remove(STORAGE_KEYS.AUTH_TOKEN);
    storageService.remove(STORAGE_KEYS.USER_DATA);
  },
};
