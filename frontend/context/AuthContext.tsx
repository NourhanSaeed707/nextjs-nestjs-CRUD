// components/CurrentUserProvider.tsx
import client from "@/client/client";
import { LoginUser, UserContext, UserType } from "@/types/users";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";
import axios from "axios";

const AuthContext = createContext<UserContext>({
  login: () => {},
  logout: () => {},
  currentUser: null,
  isSubmitting: false,
  setCurrentUser: () => {},
});

type ProviderProps = {
  children: ReactNode;
};

export default function CurrentUserProvider({ children }: ProviderProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: user, mutate } = useSWR<UserType>(
    "/auth/validate-token",
    async () => {
      const response = await axios.get("/api/get-user");
      const data = response.data;

      console.log("dataaaa from auth context");
      console.log(data);

      if (data) {
        setCurrentUser(data);
      }

      return data || false;
    },
    {
      dedupingInterval: 1000,
    }
  );

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (currentUser && router.pathname === "/login") {
      router.push("/");
    }
  }, [currentUser, router]);

  const login = useCallback(
    async (values: LoginUser) => {
      setIsSubmitting(true);
      try {
        const res = await axios.post("/api/login", {
          username: values.username,
          password: values.password,
        });

        if (res.status === 200) {
          mutate().then(() => {
            router.push("/");
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [mutate, router]
  );

  const logout = useCallback(async () => {
    try {
      await axios.post("/api/logout");
      setCurrentUser(null);
      mutate();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [mutate, router]);

  const stateValues = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      isSubmitting,
      login,
      logout,
    }),
    [setCurrentUser, currentUser, isSubmitting, login, logout]
  );

  return (
    <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within CurrentUserProvider");
  }
  return context;
}
