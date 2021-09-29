import express from "express";
import session from "express-session";
import passport from "./passport";
import authRouter from "./router";
import dotenv from "dotenv";
import "./db";

dotenv.config();

const app = express();
const PORT = 3001 || process.env.PORT;

app.use(
  session({
    secret: "2kdfjasdlsasahjksda",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use("/auth", authRouter);
app.get("/api", (req, res) => res.json({ username: "hosu" }));

app.listen(PORT, () => console.log("Listening to 3001..."));

export default app;
