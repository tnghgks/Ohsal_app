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
  try {
    const {
      // Discord Api 서버에서 AccessToken을 사용하여 사용자 정보 가져오기
      data: { user },
    } = await axios.get("https://discord.com/api/oauth2/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const userData = await User.findOne({ discordId: user.id }); // DB에 있는 사용자가 맞는지  체크

    if (userData) {
      // DB에 있으면 passport를 통하여 세션에 로그인시킨다
      req.logIn(userData.discordId, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("http://localhost:3000/"); // 로그인 후 홈으로 이동
      });
    }
  } catch (err) {
    if (err.response.status === 401) {
      try {
        const { refreshToken } = await User.findOne({ accessToken });

        const data = {
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_SECRET,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        };
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
        const result = await axios.post(
          "https://discord.com/api/oauth2/token",
          data,
          headers
        );
      } catch {}
    }
    console.log(typeof err.response.status);
  }
};

//refresh token 수정중
export const tokenTest = async (req, res, next) => {
  try {
    const accessToken = req.signedCookies.token; // 브라우저에 있는 Signed 된 Token 가져오기
    if (!accessToken) {
      return next();
    }
    const { refreshToken } = await User.findOne({ accessToken });

    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const result = await axios.post(
      "https://discord.com/api/v8/oauth2/token",
      data,
      { headers }
    );
    console.log(result);
    console.log(refreshToken);
  } catch (error) {
    console.log(error);
  }
};
