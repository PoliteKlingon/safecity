import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { User } from "@/types/User";
import { userSchema } from "@/schemas/User";

type RequestData = {
  type: "sign-up" | "sign-in";
} & User;

const usersFilePath = path.join(process.cwd(), "users.json");

const readUsersFromFile = (): User[] => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }

  const fileContent = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(fileContent) as User[];
};

const writeUsersToFile = (users: User[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
};

export async function POST(request: Request) {
    try {
    const body = await request.json();

    if (!userSchema.safeParse(body)) {
      return new Response("Invalid Data", { status: 400 });
    }

    const { type, login, password } = body;

    const users = readUsersFromFile();

    if (type === "sign-up") {
      const userExists = users.some((user) => user.login === login);

      if (userExists) {
        return new Response("User already exists", { status: 409 });
      }

      users.push({ login, password });
      writeUsersToFile(users);
      return new Response("User signed up successfully", { status: 200 });
    } else if (type === "sign-in") {
      const user = users.find(
        (user) => user.login === login && user.password === password,
      );

      if (user) {
        return new Response("User signed in successfully", { status: 200 });
      } else {
        return new Response("User not found", { status: 404 });
      }
    }

    return new Response("Invalid request type", { status: 400 });
  } catch {
    return new Response("Bad Request", { status: 400 });
  }
}
