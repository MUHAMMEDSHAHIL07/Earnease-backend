import mongoose, { Schema } from "mongoose"
const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   phonenumber:{
      type:String,
      required:true
   },
   location: String,
   availability: String,
   bio: String,
   about:String,
   experience: String,
   avatarUrl:{
      type:String
   },
   role: {
      type: String,
      default: "student"
   }
})
export const userModel = mongoose.model("users", userSchema)