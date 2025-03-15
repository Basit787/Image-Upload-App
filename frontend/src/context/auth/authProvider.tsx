import { signOutApi } from "@/services/auth.api";
import { queryClient } from "@/services/client";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

type AuthContextType = {
  isToken: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isToken, setIsToken] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => signOutApi(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signOut"] });
      setIsToken(false);
      Cookies.remove("token");
      toast("User logout successfully");
    },
  });

  const login = (token: string) => {
    Cookies.set("token", token, { expires: 900 });
    setIsToken(true);
  };
  const logout = () => {
    mutate();
  };

  useEffect(() => {
    const token = Cookies.get("token");
    token ? login(token) : logout();
  }, [Cookies.get("token")]);

  return (
    <AuthContext.Provider value={{ isToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
