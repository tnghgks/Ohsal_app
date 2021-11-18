import passport from "passport";
import refresh from "passport-oauth2-refresh";
import passportDiscord from "passport-discord";
import User from "./Model/User";
import dotenv from "dotenv";

dotenv.config();

var DiscordStrategy = passportDiscord.Strategy;

var scopes = ["identify", "email", "guilds"];

passport.serializeUser(function (userId, done) {
  done(null, userId);
});

passport.deserializeUser(async function (userId, done) {
  try {
    const tokenUser = await User.findOne({ discordId: userId });
    const user = {
      discordId: tokenUser.discordId,
      username: tokenUser.username,
      nickname: tokenUser.nickname,
      avatar: tokenUser.avatar,
      admin: tokenUser.admin,
      guild: tokenUser.guild,
      rankPoint: tokenUser.rankPoint,
    };
    done(null, user);
  } catch (err) {
    console.log("deserializeUser Error !!");
    done(null);
  }
});

const discorStrat = new DiscordStrategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_SECRET,
    callbackURL: process.env.DISCORD_REDIRECT,
    scope: scopes,
  },
  async function (accessToken, refreshToken, profile, done) {
    let user = {};
    const userExist = await User.exists({ discordId: profile.id });
    const guildExist = profile.guilds.find(
      (guild) => guild.id === "490813172857700353" // 오살 서버 없는 계정 Block test 필요
    );

    if (!userExist) {
      // 로그인한 유저가 User DB에 없으면 새로 생성
      if (guildExist) {
        // 오살 서버에 참가한 계정인지 확인
        /* user = await User.create({
          discordId: profile.id,
          username: profile.username,
          avatar: profile.avatar,
          guild: guildExist,
        }); */
        if (profile.nickname) {
          user = await User.create({
            discordId: profile.id,
            username: profile.username,
            nickname: profile.nickname,
            avatar: profile.avatar,
            guild: guildExist,
            accessToken,
            refreshToken,
          });
        } else {
          user = await User.create({
            discordId: profile.id,
            username: profile.username,
            nickname: profile.username,
            avatar: profile.avatar,
            guild: guildExist,
            accessToken,
            refreshToken,
          });
        }
      }
      return done(null);
    } else {
      try {
        user = await User.findOneAndUpdate(
          { discordId: profile.id },
          { accessToken, refreshToken }
        );
      } catch (error) {
        console.log("계정 인증 에러");
      }
    }
    return done(null, user.discordId);
  }
);

passport.use(discorStrat);
refresh.use(discorStrat);

export default passport;
