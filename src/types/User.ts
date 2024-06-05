import { userSchema } from "@/schemas/User";
import { z } from "zod";

export type User = z.infer<typeof userSchema>