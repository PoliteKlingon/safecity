"use client";
import { useUserContext } from "@/providers/UserProvider";
import { usePathname, redirect, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

/**
 * Component that ensures that when there is no user logged in, they
 * are redirected to the login page
 */
const UserRedirect = () => {
  const { user } = useUserContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLogout = searchParams.get("logout") !== null;

  // if no user is logged in, redirect to the login page
  useEffect(() => {
    if (!user && pathname !== "/login" && !isLogout) {
      redirect("/login");
    }
  }, [user, pathname, isLogout]);

  return <div />;
};

export default UserRedirect;
