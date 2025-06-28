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
   phonenumber: {
      type: String,
   },
   location:
   {
      type: String
   },
   availability: String,
   bio: String,
   about: String,
   experience: String,
   avatarUrl: {
      type: String
   },
   resetToken: {
      type: String,
      default: null
   },
   resetTokenExpiry: {
      type: Date,
      default: null
   },
   role: {
      type: String,
      default: "student"
   }
})
export const userModel = mongoose.model("users", userSchema)