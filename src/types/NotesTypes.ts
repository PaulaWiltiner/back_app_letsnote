import {notes} from "@prisma/client"

export type TNotes = Omit<notes ,'id'>;
