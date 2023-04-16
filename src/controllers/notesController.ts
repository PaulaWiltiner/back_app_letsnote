import { Request, Response } from "express";
import * as notesService from "../services/notesService"
import { TNotes } from "../types/NotesTypes";


export async function createNote(req:Request, res:Response) {
  const data : TNotes = req.body;

  const response = await notesService.createNote(data)
  console.log(response)
  res.send(response).status(201);
}


export async function getNotes(req: Request, res: Response) {
  
  const { userId } = res.locals;

  const notesList = await notesService.getNotes( userId );

  return res.send(notesList).status(200);

}

export async function getNote(req: Request, res: Response) {

  const { id } = req.params as Record<string, string>;

  const note = await notesService.getNote(Number(id) );

  return res.send(note).status(200);

}

export async function deleteNote(req: Request, res: Response) {


  const { id } = req.params as Record<string, string>;

  await notesService.dellNote(Number(id) );
  
  return res.sendStatus(204);

}

export async function updateNote(req: Request, res: Response) {


  const { id } = req.params as Record<string, string>;

  const data : TNotes = req.body;

  await notesService.update(Number(id),data )

  res.sendStatus(201);

}

