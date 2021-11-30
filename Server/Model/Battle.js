import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  battleName: {
    type: String,
    required: true,
  },
  isEnd: {
    type: Boolean,
    default: false,
  },
  maxRound: {
    type: Number,
    default: 1,
    required: true,
  },
  currentRound: {
    type: Number,
    default: 1,
    required: true,
  },
  userCount: {
    type: Number,
    default: 0,
  },
  scoreId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Score",
    default: null,
  },
  currentTeam: {
    type: Array,
  },
  currentTeamMode: {
    type: Number,
    default: 4,
    required: true,
  },
  readyUser: {
    type: Array,
  },
  startDate: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createBy: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Battle", userSchema);

export default model;
