import { z } from "zod";

const signinUserSchema = z.object({
  type: z.literal("sign-in"),
  login: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

const signupUserSchema = z.object({
  type: z.literal("sign-up"),
  login: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  passwordAgain: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
});

export const loginUserSchema = z
  .discriminatedUnion("type", [signinUserSchema, signupUserSchema])
  .refine(
    (data) => data.type === "sign-in" || data.password === data.passwordAgain,
    {
      message: "Passwords do not match",
      path: ['passwordAgain']
    },
  );

export const userSchema = z.object({
    login: z.string().min(1, "Required"),
    password: z.string().min(1, "Required"),
    name: z.string().min(1, "Required"),
  });
