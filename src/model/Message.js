import { Schema, Types, model } from "mongoose";

const ObjectId = Types.ObjectId;

const MessageSchema = new Schema(
  {
    msgToRoom: {
      type: String
    },
    msgFrom: {
      // tu user
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    msgTo: {
      // den riem
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    msg: {
      type: String
    },
    room: {
      type: ObjectId,
      ref: "rooms"
    },
    unreadMessage: {
      type: Boolean,
      default: false
    },
    listUserRead: { type: Array },
    dateMessage: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
);

export default model("messages", MessageSchema);
