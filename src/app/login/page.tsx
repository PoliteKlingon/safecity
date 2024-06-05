"use client";
import { userSchema } from "@/schemas/User";
import { User } from "@/types/User";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/providers/UserProvider";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { redirect, usePathname } from "next/navigation";

type Tab = "sign-in" | "sign-up";

const LoginPage = () => {
  const [tab, setTab] = useState<Tab>("sign-in");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  const methods = useForm<User>({ resolver: zodResolver(userSchema) });

  useEffect(() => {
    methods.reset();
    setErrorMessage("");
  }, [tab]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [successMessage]);

  const useLogin = useMutation({
    mutationFn: async (data: User) => {
      if (tab === "sign-in") {
        const res = await axios
          .post("/api/login", {
            type: "sign-in",
            ...data,
          })
          .catch((error) => {
            setErrorMessage(error.response.data);
            return error;
          });

        if (res.status === 200) {
          setUser(data);
        }
      } else {
        const res = await axios
          .post("/api/login", {
            type: "sign-up",
            ...data,
          })
          .catch((error) => {
            setErrorMessage(error.response.data);
            return error;
          });

        if (res.status === 200) {
          setTab("sign-in");
          setSuccessMessage("User created, you can log in");
        }
      }
    },
  });

  const onSubmit = (data: User) => {
    useLogin.mutate(data);
  };

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-full">
      <div className="text-3xl">Welcome!</div>

      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab transition-all ${tab === "sign-in" && "tab-active"}`}
          onClick={() => setTab("sign-in")}
        >
          Sign in
        </a>
        <a
          role="tab"
          className={`tab transition-all ${tab === "sign-up" && "tab-active"}`}
          onClick={() => setTab("sign-up")}
        >
          Sign up
        </a>
      </div>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <input
          type="text"
          {...methods.register("login")}
          placeholder="Login"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          {...methods.register("password")}
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />

        <div className="text-red-600">{errorMessage}</div>
        <div className="text-green-600">{successMessage}</div>

        <button
          type="submit"
          disabled={useLogin.isPending}
          className="btn btn-primary px-12"
        >
          {tab === "sign-in"
            ? useLogin.isPending
              ? "Signing in..."
              : "Sign In"
            : useLogin.isPending
              ? "Signing up..."
              : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
