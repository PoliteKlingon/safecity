"use client";

import { User } from "@/types/User";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";

type UserContextType = {
  user: User | null;
  setUser: (value: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!window) return;

    const storedUser = window.sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!window) return;

    if (user) {
      window.sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      window.sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
