import  {prisma } from "../config/prisma";
import { TNotes } from "../types/NotesTypes";


export async function insertNote(dataList:TNotes) {
  const response = await prisma.notes.create({
    data: dataList
  });
 return response
}

export async function findNotes(userId : number) {
  const result = await prisma.notes.findMany(
    {
    where: {
      userId
    }
  }
  )
  
  return result;
}

export async function findById(id:number){

  const result = await prisma.notes.findUnique({
    where: {
      id
    }
  })
  
  return result;
 
 }

export async function deleteNote(id:number) {
  await prisma.notes.delete({
    where: {
      id
    }
  })
  
}

export async function updateNote(id:number,dataList:TNotes) {
  await prisma.notes.update({
    where: {
      id
    },
    data:dataList,
  })
}