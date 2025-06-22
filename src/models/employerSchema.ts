import mongoose, { Document, Schema } from "mongoose"
import { Employer } from "../types/EmployerTypes"
export interface EmployerDocument extends Employer,Document{}
const employerSchema = new Schema<EmployerDocument>({
    companyname:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"employer"
    }
})
export const employerModel = mongoose.model<EmployerDocument>("employer",employerSchema)