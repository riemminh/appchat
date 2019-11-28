import { Schema, Types, model } from "mongoose";

const ObjectId = Types.ObjectId;

const MessageSchema = new Schema(
  {
    msgToRoom: {
      type: String
    },
    msgFrom: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    msgTo: {
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
    unread: {
      type: Boolean,
      default: false
    },
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
