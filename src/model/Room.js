import { Schema, model } from "mongoose";

const User = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const RoomSchema = new Schema(
  {
    name1: {
      type: String
    },
    name2: {
      type: String
    },
    nameGroup: {
      type: String
    },
    members: [User],
    lastActive: {
      type: Date,
      default: Date.now
    },
    typeRoom: {
      type: Boolean,
      default: false // false = user | true = group
    }
  },
  {
    timestamps: true
  }
);

export default model("rooms", RoomSchema);
