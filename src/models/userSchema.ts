import mongoose, { Document, Schema } from "mongoose"
import { User } from "../types/UserTypes"
export interface UserDocument extends User,Document{}
const userSchema = new Schema<UserDocument>({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   role:{
    type:String,
    default:"student"
   }
})
export const userModel = mongoose.model<UserDocument>("users",userSchema)