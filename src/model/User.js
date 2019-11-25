import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    avatar: {
      type: String
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    lastOnline: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
);

export default model("users", UserSchema);
