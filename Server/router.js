import express from "express";
import { authCheck } from "./Api/authApi";
import passport from "passport";

const router = express.Router();

router.get("/authCheck", authCheck);
router.get("/", passport.authenticate("discord"));
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/notFound",
  }),
  (req, res) => {
    console.log(req.session);
    res.redirect("/");
  }
);

export default router;
