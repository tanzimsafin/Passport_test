const express=require('express');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:String,
    email:String,
    password:String
});
const adminSchema=new Schema({
    username:String,
    email:String,
    password:String
});
const userModel=mongoose.model('user',userSchema);
const adminModel=mongoose.model('admin',adminSchema);
module.exports={
    userModel,
    adminModel,
}