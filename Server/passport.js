import passport from "passport";
import passportDiscord from "passport-discord";
import User from "./Model/User";
import dotenv from "dotenv";

dotenv.config();

var DiscordStrategy = passportDiscord.Strategy;

var scopes = ["identify", "email", "guilds"];

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT,
      scope: scopes,
    },
    async function (accessToken, refreshToken, profile, done) {
      let user;
      const userExist = await User.exists({ discordId: profile.id });
      const guildExist = profile.guilds.find(
        (guild) => guild.id === "490813172857700353" // 오살 서버 없는 계정 Block test 필요
      );

      if (!userExist) {
        if (guildExist) {
          user = await User.create({
            discordId: profile.id,
            username: profile.username,
            avatar: profile.avatar,
            guild: guildExist,
          });
        }
      } else {
        user = await User.find({ discordId: profile.id });
      }
      return done(null, user);
    }
  )
);

export default passport;
