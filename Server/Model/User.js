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
  nickname: {
    type: String,
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
  rankPoint: {
    type: Number,
    default: 0,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

const model = mongoose.model("User", userSchema);

export default model;
