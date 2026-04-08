"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import {
  getCurrentUser,
  login as loginRequest,
  signup as signupRequest,
  type User
} from "@/lib/api";
import {
  clearSession,
  getStoredToken,
  getStoredUser,
  saveSession
} from "@/lib/auth-storage";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ ok: boolean; message?: string }>;
  resetPassword: (email: string) => Promise<{ ok: boolean; message: string }>;
  logout: () => void;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedToken = getStoredToken();
    const savedUser = getStoredUser();

    if (!savedToken) {
      setIsReady(true);
      return;
    }

    setToken(savedToken);
    if (savedUser) {
      setUser(savedUser);
    }

    void getCurrentUser(savedToken)
      .then((currentUser) => {
        saveSession(savedToken, currentUser);
        setUser(currentUser);
      })
      .catch(() => {
        clearSession();
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isReady,
      login: async (email: string, password: string) => {
        try {
          const response = await loginRequest({ email, password });
          saveSession(response.access_token, response.user);
          setToken(response.access_token);
          setUser(response.user);
          return { ok: true };
        } catch (error) {
          return {
            ok: false,
            message: error instanceof Error ? error.message : "Login failed."
          };
        }
      },
      signup: async (name: string, email: string, password: string) => {
        if (!name || !email || !password) {
          return { ok: false, message: "Please fill in all fields." };
        }

        try {
          const response = await signupRequest({ name, email, password });
          saveSession(response.access_token, response.user);
          setToken(response.access_token);
          setUser(response.user);
          return { ok: true };
        } catch (error) {
          return {
            ok: false,
            message: error instanceof Error ? error.message : "Signup failed."
          };
        }
      },
      resetPassword: async (email: string) => {
        if (!email) {
          return { ok: false, message: "Enter your email first." };
        }

        return {
          ok: true,
          message: `Password recovery is not available yet for ${email}. Please sign up again or add a reset API later.`
        };
      },
      logout: () => {
        clearSession();
        setToken(null);
        setUser(null);
      }
    }),
    [isReady, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
