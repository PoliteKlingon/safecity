"use client";
import { loginUserSchema, userSchema } from "@/schemas/user";
import { loginUser } from "@/types/user";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/providers/UserProvider";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import FormText from "@/components/form/FormText";

type Tab = "sign-in" | "sign-up";

const LoginPage = () => {
  const [tab, setTab] = useState<Tab>("sign-in");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { user, setUser } = useUserContext();
  const searchParams = useSearchParams();
  const isLogout = searchParams.get("logout") !== null;

  useEffect(() => {
    if (isLogout) {
      setUser(null);
      redirect("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogout]);

  useEffect(() => {
    if (user && !isLogout) {
      redirect("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const methods = useForm<loginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: { type: tab },
  });

  useEffect(() => {
    methods.reset();
    methods.setValue("type", tab);
    setErrorMessage("");
  }, [tab, methods]);

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
    mutationFn: async (data: loginUser) => {
      if (tab === "sign-in") {
        const res = await axios.post("/api/login", data).catch((error) => {
          setErrorMessage(error.response.data);
          return error;
        });

        if (res.status === 200) {
          setUser(res.data);
        }
      } else {
        const res = await axios.post("/api/login", data).catch((error) => {
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

  const onSubmit = (data: loginUser) => {
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
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center gap-4 mt-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {tab === "sign-up" && <FormText name="name" placeholder="Name" />}
          <FormText name="login" placeholder="Login" />
          <FormText name="password" placeholder="Password" type="password" />
          {tab === "sign-up" && (
            <FormText
              name="passwordAgain"
              type="password"
              placeholder="Password Again"
            />
          )}

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
      </FormProvider>
    </div>
  );
};

export default LoginPage;
