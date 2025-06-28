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
   },
   phonenumber:{
      type:String,
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