import mongoose, { Document,Schema } from "mongoose";
import { Admin } from "../types/adminField";

export interface AdminDocument extends Admin,Document{}
const adminSchema = new Schema<AdminDocument>({
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
        default:"admin"
    }
})
export const adminModel = mongoose.model<AdminDocument>("users",adminSchema)