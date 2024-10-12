const express=require('express');
const app=express();
var passport = require('passport');
var session = require('express-session');
const {userRouter}=require('./router/user');
const {adminRouter}=require('./router/admin');

const mongoose  = require('mongoose');


app.use(express.json());

app.use(session({
    secret: 'hello there', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/user',userRouter);
app.use('/admin',adminRouter);
async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
}
main();