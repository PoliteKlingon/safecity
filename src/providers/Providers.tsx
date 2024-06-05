"use client";
import React, { PropsWithChildren, useEffect } from "react";
import UserProvider from "./UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UserProvider>
  );
};

export default Providers;
