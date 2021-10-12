import User from "../../Model/User";
import { memberCheck, setAllMembers } from "../Controller/userController";

let userArr = [];

// 215 채널 유저 점수 기록
export const hitEvent_215 = async (message) => {
  if (message.author.bot) return;
  if (message.channel.name === "215🔴213-217") {
    const userId = message.author.id;
    const userName = message.author.username;

    await memberCheck(userId, userName);

    let user = await User.findOne({ discordID: userId });

    await User.findOneAndUpdate(
      { discordID: userId },
      { $set: { _215: user._215 + 1 } }
    );

    user = await User.findOne({ discordID: userId });

    message.reply(`점수 적용! 현재 점수는 ${user._215} 입니다.`);
  }
  return;
};
// 321 채널 유저 점수 기록
export const hitEvent_321 = async (message) => {
  if (message.author.bot) return;
  if (message.channel.name === "321🟠319-323") {
    const userId = message.author.id;
    const userName = message.author.username;

    await memberCheck(userId, userName);

    let user = await User.findOne({ discordID: userId });

    await User.findOneAndUpdate(
      { discordID: userId },
      { $set: { _321: user._321 + 1 } }
    );

    user = await User.findOne({ discordID: userId });

    message.reply(`점수 적용! 현재 점수는 ${user._321} 입니다.`);
  }
  return;
};
// 615 채널 유저 점수 기록
export const hitEvent_615 = async (message) => {
  if (message.author.bot) return;
  if (message.channel.name === "615🟡613-617") {
    const userId = message.author.id;
    const userName = message.author.username;

    await memberCheck(userId, userName);

    let user = await User.findOne({ discordID: userId });

    await User.findOneAndUpdate(
      { discordID: userId },
      { $set: { _615: user._615 + 1 } }
    );

    user = await User.findOne({ discordID: userId });

    message.reply(`점수 적용! 현재 점수는 ${user._615} 입니다.`);
  }
  return;
};
// 702 채널 유저 점수 기록
export const hitEvent_702 = async (message) => {
  if (message.author.bot) return;
  if (message.channel.name === "702🟢700-704") {
    const userId = message.author.id;
    const userName = message.author.username;

    await memberCheck(userId, userName);

    let user = await User.findOne({ discordID: userId });

    await User.findOneAndUpdate(
      { discordID: userId },
      { $set: { _702: user._702 + 1 } }
    );

    user = await User.findOne({ discordID: userId });

    message.reply(`점수 적용! 현재 점수는 ${user._702} 입니다.`);
  }
  return;
};
// 714 채널 유저 점수 기록
export const hitEvent_714 = async (message) => {
  if (message.author.bot) return;
  if (message.channel.name === "714🔵712-716") {
    const userId = message.author.id;
    const userName = message.author.username;

    await memberCheck(userId, userName);

    let user = await User.findOne({ discordID: userId });

    await User.findOneAndUpdate(
      { discordID: userId },
      { $set: { _714: user._714 + 1 } }
    );

    user = await User.findOne({ discordID: userId });

    message.reply(`점수 적용! 현재 점수는 ${user._714} 입니다.`);
  }
  return;
};

//노말게임 점수 집계
export const nomalChicken = async (message) => {
  if (message.author.bot) return;
  if (message.channel.name === "일반") {
    // Username과 User Discord ID 생성
    userArr = message.mentions.users.map((user) => user.username);
    let userIdArr = message.mentions.users.map((user) => user.id);

    userArr.forEach(async (item, index, array) => {
      await memberCheck(userIdArr[index], item);

      let member = await message.guild.members.cache.get(userIdArr[index]); //디스코드 서버에 해당 유저 정보 갖고오기
      let user = await User.findOne({ discordID: userIdArr[index] }); // User DB에서 해당 유저 찾기

      await User.findOneAndUpdate(
        { discordID: userIdArr[index] },
        {
          $set: {
            rankPoint: user.rankPoint + 1,
            username: item,
            nickname: member.nickname,
          },
        }
      );
    });
    message.reply("일반 치킨 적용되었습니다.");
  }
  return;
};

//경쟁게임 점수 집계
export const competitionChicken = async (message) => {
  if (message.author.bot) return;
  if (message.channel.name === "경쟁") {
    // Username과 User Discord ID 생성
    userArr = message.mentions.users.map((user) => user.username);
    let userIdArr = message.mentions.users.map((user) => user.id);

    userArr.forEach(async (item, index, array) => {
      await memberCheck(userIdArr[index], item);

      let member = await message.guild.members.cache.get(userIdArr[index]); //디스코드 서버에 해당 유저 정보 갖고오기
      let user = await User.findOne({ discordID: userIdArr[index] }); // User DB에서 해당 유저 찾기

      await User.findOneAndUpdate(
        { discordID: userIdArr[index] },
        {
          $set: {
            rankPoint: user.rankPoint + 3,
            username: item,
            nickname: member.nickname,
          },
        }
      );
    });
    message.reply("경쟁 치킨 적용되었습니다.");
  }
  return;
};
