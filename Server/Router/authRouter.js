import express from "express";
import { authCheck, logout } from "../Api/authApi";
import passport from "passport";
import { loginCheck, cookieCheck, tokenTest } from "../middleware";
import User from "../Model/User";

const router = express.Router();

router.get("/authCheck", authCheck);
router.get("/logout", logout);
router.get(
  "/",
  tokenTest,
  cookieCheck,
  loginCheck,
  passport.authenticate("discord")
);
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "http://localhost:3000/",
  }),
  async (req, res) => {
    const user = await User.findOne({ discordId: req.user });

    res.cookie("token", user.accessToken, {
      expires: new Date(Date.now() + 100000002),
      httpOnly: true,
      signed: true,
    });
    res.redirect("http://localhost:3000/");
  }
);

export default router;
