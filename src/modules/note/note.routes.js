import { Router } from "express";
import { addNote, deleteNote, getAllNotes, updateNote } from "./note.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addNoteVal, updateNoteVal } from "./note.validation.js";
import { validate } from "../../middleware/validate.js";

const noteRouter=Router()

noteRouter.use(verifyToken)
noteRouter.post("/addNote",validate(addNoteVal),addNote)
noteRouter.get("/",getAllNotes)
noteRouter.put("/note/:id",validate(updateNoteVal),updateNote)
noteRouter.delete("/note/:id",deleteNote)



export default noteRouter