require('dotenv').config();
const express = require('express');
const userRouter = express.Router();
const {z}=require('zod');
const {userModel}=require('../db');
const passport=require('passport');
const {userMiddleware}=require('../middleWare/user')

//userRegistration
userRouter.post('/signup',async function(req,res){
     const username=req.body.username;
     const email=req.body.email;
     const password=req.body.password;
     const user=z.object({
         username: z.string(),
         email:z.string().email(),
         password:z.string().min(5).max(10)
     });
     const isValidInput=user.safeParse(req.body);
     if (!isValidInput.success){
        res.json({
            message:"Invalid Format!"
        });
        return;
     };
     const duplicateUser=await userModel.findOne({
        email:email
     });
     if (duplicateUser){
        res.json('This email is already Registerd!');
        return;
     };
     try{
        await userModel.create({
            username,
            email,
            password
         });
        res.json({
            message:"hello this user Sign Up!"
         });
     }catch(error){
        message:error
     };
});

//router user/sign
userRouter.post('/signin',userMiddleware,function(req, res) {
    res.json({
        message: "hello the  user is Signed In!"
    });
});
module.exports={
    userRouter:userRouter
}