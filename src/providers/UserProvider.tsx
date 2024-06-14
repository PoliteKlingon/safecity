"use client";

import { User } from "@/types/user";
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

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUser = window.sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      if (isLoaded) {
        window.sessionStorage.removeItem("user");
      }
    }
  }, [user, isLoaded]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
