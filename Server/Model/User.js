import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  guild: {
    type: Object,
  },
});

const model = mongoose.model("User", userSchema);

export default model;
