import { useState, useCallback } from 'react';
import { authService } from '../services/authService';
import { AuthState } from '../models/user';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => authService.getCurrentSession());
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const user = await authService.login(email);
      setAuthState({
        user,
        token: 'token-' + user.id,
        isAuthenticated: true,
      });
      return user;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  }, []);

  return {
    ...authState,
    loading,
    login,
    logout,
  };
}
