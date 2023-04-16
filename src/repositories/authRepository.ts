import  {prisma}  from "../config/prisma";
import { TSessions, TUsers } from "../types/AuthTypes";

export async function findByEmail(email:string) {
  const result = await prisma.users.findUnique({
    where: {
      email
    }
  })
  
  return result;
}

export async function insertUser(dataList:TUsers) {
  await prisma.users.create({
    data: dataList
  });

}

export async function findUser(id: number) {
  const result = await prisma.users.findUnique({
    where: {id}
  })
  
  return result;
}

export async function insertSession(dataList:TSessions) {
  await prisma.sessions.create({
    data: dataList
  });
}

export async function findSession(token:any) {
  const result = await prisma.sessions.findUnique({
    where: {
      token
    }
  })
  
  return result;
}

export async function deletesSession(token:any) {
  const result = await prisma.sessions.delete({
    where: {
      token
    }
  })
  
  return result;
}