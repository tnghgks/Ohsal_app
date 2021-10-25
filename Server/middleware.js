import axios from "axios";
import dotenv from "dotenv";
import User from "./Model/User";

dotenv.config();

export const loginCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json({ message: "이미 로그인한 상태입니다." }); // 로그인시 예외처리 추가 필요 **
  }

  return next();
};

export const cookieCheck = async (req, res, next) => {
  const accessToken = req.signedCookies.token; // 브라우저에 있는 Signed 된 Token 가져오기
  if (!accessToken) {
    return next();
  }
  const userData = await User.findOne({ accessToken });
  if (!userData) {
    return next();
  }

  try {
    const {
      data: { user },
    } = await axios.get("https://discord.com/api/oauth2/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // DB에 있으면 passport를 통하여 세션에 로그인시킨다
    req.logIn(user.id, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("http://localhost:3000/"); // 로그인 후 홈으로 이동
    });
  } catch (err) {
    console.log(err.response.status);
    if (err.response.status === 401) {
      try {
        const params = new URLSearchParams(
          `client_id=${process.env.DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_SECRET}&grant_type=refresh_token&refresh_token=${userData.refreshToken}`
        );

        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        };
        const { data } = await axios.post(
          "https://discordapp.com/api/oauth2/token",
          params,
          config
        );
        await User.findOneAndUpdate(
          { accessToken },
          {
            $set: {
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            },
          }
        );
        console.log(data);

        res.cookie("token", data.access_token, {
          expires: new Date(Date.now() + 100000002),
          httpOnly: true,
          signed: true,
        });

        return res.redirect("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
