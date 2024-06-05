"use client";
import { useUserContext } from "@/providers/UserProvider";
import { usePathname, redirect } from "next/navigation";
import React, { useEffect } from "react";

/**
 * Component that ensures that when there is no user logged in, they
 * are redirected to the login page
 */
const UserRedirect = () => {
  const { user } = useUserContext();
  const pathname = usePathname();

  // if no user is logged in, redirect to the login page
  useEffect(() => {
    "HUH";
    if (!user && pathname !== "/login") {
      redirect("/login");
    }
  }, [user]);

  return <div />;
};

export default UserRedirect;
