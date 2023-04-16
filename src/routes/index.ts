import { Router } from "express";
import authRouter from "./authRouter";
import notesRouter from "./notesRouter";

const router = Router();
router.use(authRouter);
router.use(notesRouter);

export default router;