import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import "dotenv/config"
import {emailRegex,passwordRegex} from "../blogging website - frontend/src/regex.js"
import { nanoid } from "nanoid"


//// Schemas
import User from "./Schema/User.js"





const server=express();
let PORT=3000

//MIDDLEWARE
server.use(express.json())


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

// REQUESTS

const formatDatatosend=(user)=>{
    return {
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
    if(fullname.length<3)
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
        let username=await generateUsername(email);

        let user=new User({
            personal_info:{
                fullname,email,password:hashed_password,username
            }
        })

         user.save()
        .then((u)=>{
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


//SERVER LISTENING

server.listen(PORT,()=>{
    console.log("------- Listening on port ->" + PORT);
})

