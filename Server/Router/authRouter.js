import express from "express";
import { getUser, logout } from "../Api/authApi";
import passport from "passport";
import { loginCheck, cookieCheck } from "../middleware";
import User from "../Model/User";

const router = express.Router();

router.get("/authCheck", getUser);
router.get("/logout", logout);
router.get("/", cookieCheck, loginCheck, passport.authenticate("discord"));
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
