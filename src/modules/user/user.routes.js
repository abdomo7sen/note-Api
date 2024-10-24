import { Router } from "express";
import { addUser, deleteUser, getAllUsers, signIn, updateUser } from "./user.controller.js";
import { checkSigninEmail, checkSignupEmail } from "../../middleware/authontication.js";
import { validate } from "../../middleware/validate.js";
import { signinVal, signupVal } from "./user.validation.js";

const userRouter=Router()


userRouter.post("/signup",validate(signupVal),checkSignupEmail,addUser)
userRouter.get("/signin",validate(signinVal),checkSigninEmail,signIn)
userRouter.get("/",getAllUsers)
userRouter.put("/user/:id",updateUser)
userRouter.delete("/user/:id",deleteUser)



export default userRouter