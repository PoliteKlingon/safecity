"use client";
import React, { PropsWithChildren, useEffect } from "react";
import UserProvider from "./UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocationProvider from "./LocationProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <UserProvider>
      <LocationProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </LocationProvider>
    </UserProvider>
  );
};

export default Providers;
