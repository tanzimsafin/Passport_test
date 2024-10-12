const express = require('express');
const adminRouter = express.Router();

//adminRegistration
adminRouter.post('/signup',function(req,res){
     const username=req.body.username;
     const email=req.body.email;
     const password=req.body.password;
});
//adminLogin
adminRouter.post('/signin',function(req,res){
    const email=req.body.email;
    const password=req.body.password;
});
module.exports={
    adminRouter:adminRouter
}