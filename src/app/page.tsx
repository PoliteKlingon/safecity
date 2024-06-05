"use client";
import { useUserContext } from "@/providers/UserProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [user]);

  return (
    <>
      <div>HomePage</div>
    </>
  );
};

export default HomePage;
