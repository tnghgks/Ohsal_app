import { Client } from "discord.js";
import dotenv from "dotenv";
import {
  hitEvent_215,
  hitEvent_321,
  hitEvent_615,
  hitEvent_702,
  hitEvent_714,
  nomalChicken,
  competitionChicken,
} from "./Controller/messageController";

dotenv.config();

const client = new Client();

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", nomalChicken);

client.on("message", competitionChicken);

/* 
// 215 채널 유저 점수 기록
client.on("message", hitEvent_215);
// 321 채널 유저 점수 기록
client.on("message", hitEvent_321);
// 615 채널 유저 점수 기록
client.on("message", hitEvent_615);
// 702 채널 유저 점수 기록
client.on("message", hitEvent_702);
// 714 채널 유저 점수 기록
client.on("message", hitEvent_714);
 */

client.login(process.env.DISCORD_BOT_TOKEN);
