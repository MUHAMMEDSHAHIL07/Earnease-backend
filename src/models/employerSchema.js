import mongoose, { Schema } from "mongoose"
const employerSchema = new Schema({
    companyname: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "employer"
    },
    avatarUrl:{
      type:String
   },
    isVerified: {
        type: Boolean,
        default: false,
    }

})
export const employerModel = mongoose.model("employer", employerSchema)