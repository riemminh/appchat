import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

export default model("users", UserSchema);
