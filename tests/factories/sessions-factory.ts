import { sessions } from "@prisma/client";
import { createUser } from "./users-factory";
import { prisma } from "../../src/config/prisma";
import jwt from "jsonwebtoken";

export async function createSession(params?:any): Promise<sessions> {
  const user = await createUser(params);
  const token:string = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

  return prisma.sessions.create({
    data: {
      token: token,
      userId: user.id,
      username: user.name
    },
  });
}