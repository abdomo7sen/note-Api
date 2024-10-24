import User from "../../../database/models/user.model.js"
import { sendEmail } from "../../email/sendEmail.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { signupVal } from "./user.validation.js"



const addUser=catchError(async (req,res,next)=>{
    let user=await User.insertMany(req.body)
    sendEmail(req.body.email)
    user[0].password = undefined
    res.status(201).json({message:"success", user})
    
    
})


const signIn=catchError(
    async (req,res)=>{
    
        res.status(201).json({message:"success",token:req.token})
    }
)



const getAllUsers=catchError(async (req,res)=>{
    let user=await User.find()
    res.status(200).json({message:"success", user})
})

const updateUser=catchError(async (req,res)=>{
    let user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({message:"success", user})
})

const deleteUser=catchError(async (req,res)=>{
    let user=await User.findByIdAndDelete(req.params.id)
    if (user==null) return res.status(404).json({message:"user not found"})
        

    res.status(200).json({message:"success", user})
})

export{
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
    signIn
}