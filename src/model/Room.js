import { Schema, model, Types } from "mongoose";

const RoomSchema = new Schema(
  {
    name1: {
      type: String
    },
    name2: {
      type: String
    },
    members: [
      {
        user: Types.ObjectId,
        ref: "users"
      }
    ],
    lastActive: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default model("rooms", RoomSchema);
