import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const registerUser= async (req:Request, res : Response)=> {

    try {
        const {name,email,password,avatar} = req.body;
        if(!email || !password || !name){
                 res.status(400).json({
                    message : "all fields are required"
                })
                    return
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({
                message : "user already exists"
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name ,
            email,
            password : hashedPassword,
            avatar
        })

        res.status(201).json({
            message : "user reguester succesfully !",
            user
        })
      
    } catch (error) {
                console.log("internal server error", error)
                 res.status(500).json({
                   message: "Internal Server Error",
                 });
    }


};
export const loginUser=async(req : Request , res : Response): Promise<void >=> {
    
    try {
            const {email, password} = req.body;
             if(!email || !password){
                res.status(400).json({
                    message : "fields are required"
                })
             }
    
             const user = await User.findOne({email});
             if(!user){
                res.status(400).json({
                    message : "user does not exists"
                })
                    return
             }

             const isMatch = await bcrypt.compare(password,user.password)
             if(!isMatch){
                 res.status(401).json({
                   message: "Invalid credentials",
                 });
                 return;
             }

             const token =jwt.sign({
                userId : user._id
             },    process.env.JWT_SECRET as string,{
                expiresIn: "7d"
             })

             res.status(200).json({
                message : "login successful! ",
                token,
                user : {
                    _id: user._id,
                    name : user.name,
                    email : user.email
                }
             })

             
    } catch (error) {
        console.log("internal server error", error)

    }
 
}