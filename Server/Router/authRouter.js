import express from "express";
import { authCheck, logout } from "../Api/authApi";
import passport from "passport";
import { loginCheck } from "../middleware";

const router = express.Router();

router.get("/authCheck", authCheck);
router.get("/logout", logout);
router.get("/", loginCheck, passport.authenticate("discord"));
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "http://localhost:3000/",
  }),
  (req, res) => {
    //console.log(req.user);
    res.redirect("http://localhost:3000/");
  }
);

export default router;
