import { loginUserSchema, userSchema } from "@/schemas/user";
import { z } from "zod";

export type User = z.infer<typeof userSchema>
export type loginUser = z.infer<typeof loginUserSchema>