
import { findUser } from "../repositories/authRepository";
import { insertNote, findNotes, findById , updateNote , deleteNote} from "../repositories/notesRepository";
import { TNotes } from '../types/NotesTypes';


export async function createNote(data:TNotes){

  const user = await findUser(data.userId)

  if(!user) throw {code:'NotFound' , message:'User not found'}
  
  const dataList=data
  const resp = await insertNote(dataList)
  return resp
 
 }

 export async function getNotes(userId : number){

  const result= await findNotes(userId )

  return result
 
 }

 export async function getNote(id: number,){

   const result = await findById(id)
   if(!result) throw {code:'NotFound' , message:'Note not found'}
   

  return result
 
 }

 export async function dellNote(id:number){

  const noteId = await findById(id)
  if(!noteId) throw {code:'NotFound' , message:'Note not found'}

  await deleteNote(id)
 
 }

 export async function update(id:number,data:TNotes){

  const noteId = await findById(id)
  if(!noteId) throw {code:'NotFound' , message:'Note not found'}

  const dataList=data
  await updateNote(id,dataList)
 
 }