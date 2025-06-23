import mongoose, { Schema } from "mongoose"
const userSchema = new Schema({
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
export const userModel = mongoose.model("users",userSchema)