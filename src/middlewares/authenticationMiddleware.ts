import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findSession } from "../repositories/authRepository";
dotenv.config();

export default async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
   jwt.verify(token, process.env.JWT_SECRET);
  } 
  catch {
    return res.sendStatus(401);
  }

  const session = await findSession(token);
  res.locals.userId = session.userId;
 
  if (!session) {
    return res.sendStatus(401);
  }

  
  next();
}