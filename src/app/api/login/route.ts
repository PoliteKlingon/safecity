import {sql} from "@vercel/postgres"
import path from "path";
import { User } from "@/types/user";
import { userSchema } from "@/schemas/user";
import { z } from "zod";

const requestTypeSchema = z.object({
  type: z.union([z.literal("sign-up"), z.literal("sign-in")])
})

const requestSchema = z.intersection(requestTypeSchema, userSchema)

const userExists = async (login:string) => {
  const {rowCount} = await sql`SELECT * FROM users WHERE login = ${login} LIMIT 1;`;
  return rowCount > 0
}

const insertUser = async (user:User) => {
  return await sql`INSERT INTO users (name, login, password) VALUES (${user.name ?? "Neznámý uživatel"}, ${user.login}, ${user.password})`;
}

const userEnteredCorrectCredentials = async (login:string, password: string) => {
  const {rows} = await sql`SELECT * FROM users WHERE login = ${login} AND password = ${password} LIMIT 1;`;
  return rows.length > 0 ? rows[0] : undefined
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!requestSchema.safeParse(body)) {
      return new Response("Invalid Data", { status: 400 });
    }

    const { type, name, login, password } = body;

    if (type === "sign-up") {
      if (await userExists(login)) {
        return new Response("User already exists", { status: 409 });
      }

      insertUser({name, login, password})
      return new Response("User signed up successfully", { status: 200 });
    } else if (type === "sign-in") {
      if (!await userExists(login)) {
        return new Response("User not found", { status: 404 });
      }

      const user = await userEnteredCorrectCredentials(login, password)
      if (user) {
        return new Response(JSON.stringify(user), { status: 200 });
      } else {
        return new Response("Wrong credentials", { status: 404 });
      }
    }

    return new Response("Invalid request type", { status: 400 });
  } catch (e) {
    console.log(e);
    return new Response("Internal error", { status: 500 });
  }
}
