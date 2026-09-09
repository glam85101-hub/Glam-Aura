"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
} | null;

type AuthContextType = {
  user: User;
  isSignedIn: boolean;
  isLoaded: boolean;
  signIn: typeof authClient.signIn;
  signUp: typeof authClient.signUp;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isSignedIn: false,
  isLoaded: false,
  signIn: authClient.signIn,
  signUp: authClient.signUp,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchSession = async () => {
    try {
      const { data } = await authClient.getSession();
      if (data?.user) {
        setUser(data.user as User);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const signOut = async () => {
    await authClient.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn: !!user,
        isLoaded,
        signIn: authClient.signIn,
        signUp: authClient.signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
