import { Schema, Types, model } from "mongoose";

const ObjectId = Types.ObjectId;

const MessageSchema = new Schema(
  {
    msgFrom: {
      type: String
    },
    msgTo: {
      type: String
    },
    msg: {
      type: String
    },
    room: {
      type: ObjectId,
      ref: "rooms"
    }
  },
  {
    timestamps: true
  }
);

export default model("messages", MessageSchema);
