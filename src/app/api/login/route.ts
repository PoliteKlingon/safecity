import {sql} from "@vercel/postgres"
import { loginUser } from "@/types/user";
import { loginUserSchema} from "@/schemas/user";

const userExists = async (login:string) => {
  const {rowCount} = await sql`SELECT * FROM users WHERE login = ${login} LIMIT 1;`;
  return rowCount > 0
}

const insertUser = async (user:loginUser) => {
  if (user.type !== "sign-up") return
  return await sql`INSERT INTO users (name, login, password) VALUES (${user.name ?? "Neznámý uživatel"}, ${user.login}, ${user.password})`;
}

const userEnteredCorrectCredentials = async (login:string, password: string) => {
  const {rows} = await sql`SELECT * FROM users WHERE login = ${login} AND password = ${password} LIMIT 1;`;
  return rows.length > 0 ? rows[0] : undefined
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!loginUserSchema.safeParse(body)) {
      return new Response("Invalid Data", { status: 400 });
    }

    if (body.type === "sign-up") {
      if (await userExists(body.login)) {
        return new Response("User already exists", { status: 409 });
      }

      insertUser(body)
      return new Response("User signed up successfully", { status: 200 });
    } else if (body.type === "sign-in") {
      if (!await userExists(body.login)) {
        return new Response("User not found", { status: 404 });
      }

      const user = await userEnteredCorrectCredentials(body.login, body.password)
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
