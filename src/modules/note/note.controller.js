import Note from "../../../database/models/note.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"

const addNote=catchError(async (req,res)=>{
    
    req.body.createdBy=req.user.userId; 
    let note=await Note.insertMany(req.body)
    res.status(201).json({message:"success", note})
})


const getAllNotes=catchError(async (req,res)=>{
    
    let note=await Note.find({createdBy:req.user.userId}).populate("createdBy")
    res.status(200).json({message:"success", note})
    

    
})

const updateNote=catchError(async (req,res)=>{
    let note=await Note.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate("createdBy")
    res.status(200).json({message:"success", note})
})

const deleteNote=catchError(async (req,res,next)=>{
    let note=await Note.findByIdAndDelete(req.params.id)
    if (note==null) return next(new AppError("user not found",404))
        
    res.status(200).json({message:"success", note})
})



export{
    addNote,
    getAllNotes,
    updateNote,
    deleteNote,
    
}