import passport from "passport";
import passportDiscord from "passport-discord";
import dotenv from "dotenv";

dotenv.config();

var DiscordStrategy = passportDiscord.Strategy;

var scopes = ["identify", "email", "guilds", "guilds.join"];

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_SECRET,
      callbackURL: "/",
      scope: scopes,
    },
    function (accessToken, refreshToken, profile, cb) {
      /* User.findOrCreate({ discordId: profile.id }, function(err, user) {
        return cb(err, user);
    }); */
    }
  )
);

export default passport;
