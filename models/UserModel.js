import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required,
  },
  email: {
    type: String,
    required,
  },
  password: {
    type: String,
    required,
  },
} {timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;
