import { useState, useEffect } from 'react';

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (username: string, password: string): { success: boolean; error?: string } => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { username: string; password: string }) => 
      u.username === username && u.password === password
    );

    if (user) {
      const userData = { username: user.username };
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthState({ user: userData, isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: 'Usuário ou senha inválidos' };
  };

  const register = (username: string, password: string): { success: boolean; error?: string } => {
    if (username.length < 3) {
      return { success: false, error: 'Usuário deve ter pelo menos 3 caracteres' };
    }
    if (password.length < 4) {
      return { success: false, error: 'Senha deve ter pelo menos 4 caracteres' };
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: { username: string }) => u.username === username);

    if (existingUser) {
      return { success: false, error: 'Usuário já existe' };
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    const userData = { username };
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthState({ user: userData, isAuthenticated: true });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({ user: null, isAuthenticated: false });
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
};
