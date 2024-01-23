import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import "dotenv/config"
import {emailRegex,passwordRegex} from "../blogging website - frontend/src/regex.js"
import { nanoid } from "nanoid"
import jwt from "jsonwebtoken"
import cors from "cors"


//// Schemas
import User from "./Schema/User.js"





const server=express();
let PORT=3000

//MIDDLEWARE
server.use(express.json())
server.use(cors())


//DB CONNECTION
mongoose.connect(process.env.DB_LOCATION,
{
    autoIndex:true
})
.then(()=>{
    console.log("------- Connected To Database")
})
.catch((err)=>{
    console.log(err);
})

// REQUESTS 1 -> SIGNUP

const formatDatatosend=(user)=>{
    const access_token=jwt.sign({id:user._id},process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        profile_img:user.personal_info.profile_img,
        username:user.personal_info.username,
        fullname:user.personal_info.fullname
    }
}

const generateUsername=async(email)=>{
    let username=email.split("@")[0];

    let isUsernameExist=await User.exists({"personal_info.username":username})

    isUsernameExist ? username+=nanoid().substring(0,5) : ""

    return username;


}

server.post('/signup',(req,res)=>{
    
    let {fullname,email,password}=req.body;
    //let us validate data that we are getting from frontend from the frontend
    if(fullname.length<3 || !fullname)
    {
        return res.status(403).json({"error":"Fullname must be of atleast length 3"})
    }
    if(!email.length)
    {
        return res.status(403).json({"error":"Enter Email"})
    }
    if(!emailRegex.test(email)) // regex pattern checking
    {
        return res.status(403).json({"error":"Email is invalid"})
    }
    if(!passwordRegex.test(password))
    {
        return res.status(403).json({"error":"Password should be 6 to 20 charcters long with a neumeric, 1 lowercase and 1 uppercase letter"})
    }
    // now let us hash password and then add this data to our database using bcrypt

    bcrypt.hash(password,10,async(err,hashed_password)=>{
        if(err)
        {
            return res.status(500).json({"error":"Internal Server error"})
        }
        let username=await generateUsername(email);

        let user=new User({
            personal_info:{
                fullname,email,password:hashed_password,username
            }
        })

        user.save()
        .then((user)=>{
            return res.status(200).json(formatDatatosend(user))
        })
        .catch((err)=>{
            if(err.code===11000)
            {
                return res.status(500).json({"error":"email already exists"})
            }
            return res.status(500).json({"error":err.message})
        })
    })
})


//REQUEST 2 SIGNIN
server.post("/signin",(req,res)=>{
    let {email,password}=req.body
    User.findOne({"personal_info.email":email})
    .then((user)=>{
        if(!user)
        {
            return res.status(403).json({"error":"Email Not Found"})
        }
        bcrypt.compare(password,user.personal_info.password,(err,result)=>{
            if(err)
            {
                return res.status(500).json({"error":"Error While Logging in please try again"})
            }
            if(!result)
            {
                return res.status(403).json({"error":"Invalid Password"})
            }
            return res.status(200).json(formatDatatosend(user))
        })
    })
    .catch((err)=>{
        return res.status(500).json({"error":"err.message"})
    })
})


//SERVER LISTENING

server.listen(PORT,()=>{
    console.log("------- Listening on port ->" + PORT);
})

