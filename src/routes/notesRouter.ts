import { Router } from "express";
import authenticateToken  from "../middlewares/authenticationMiddleware";
import { createNote , updateNote, deleteNote, getNotes, getNote} from "../controllers/notesController";

const notesRouter = Router();

notesRouter.all("/*", authenticateToken)
  .post("/notes", createNote)
  .put("/notes/:id", updateNote)
  .delete("/notes/:id", deleteNote)
  .get("/notes", getNotes)
  .get("/notes/:id", getNote);

export default notesRouter;

 



