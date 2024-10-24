import joi from "joi"

const signupVal=joi.object({
    name:joi.string().min(2).max(20).required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).required().pattern(/^[A-z][A-Za-z0-9]{8,40}$/),
    rePassword:joi.valid(joi.ref("password")).required(),
    

})
const signinVal=joi.object({
        email:joi.string().email().required(),
    password:joi.string().min(8).required().pattern(/^[A-z][A-Za-z0-9]{8,40}$/),
})

export{
    signupVal,
    signinVal,
}