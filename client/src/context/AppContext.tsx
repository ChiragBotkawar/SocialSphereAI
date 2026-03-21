import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { AuthState, User, LoginForm, RegisterForm } from '../types';
import { authService } from '../services/authService';

const TOKEN_KEY = 'BWN_token';

// ─── State & Actions ─────────────────────────────────────────────────────────
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User };

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem(TOKEN_KEY, action.payload.token);
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, isLoading: false };
    case 'LOGOUT':
      localStorage.removeItem(TOKEN_KEY);
      return { ...state, user: null, token: null, isAuthenticated: false, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
interface AppContextValue extends AuthState {
  login: (data: LoginForm) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Hydrate user from stored token on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }
    authService
      .getMe()
      .then((user) => dispatch({ type: 'SET_USER', payload: user }))
      .catch(() => dispatch({ type: 'LOGOUT' }));
  }, []);

  const login = async (data: LoginForm) => {
    const result = await authService.login(data);
    dispatch({ type: 'LOGIN_SUCCESS', payload: result });
  };

  const register = async (data: RegisterForm) => {
    const result = await authService.register(data);
    dispatch({ type: 'LOGIN_SUCCESS', payload: result });
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AppContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
