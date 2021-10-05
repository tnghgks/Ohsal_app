import express from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "./passport";
import authRouter from "./router";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import "./db";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(morgan("tiny"));
app.use(
  session({
    secret: "2kdfjasdlsasahjksda",
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.get("/", (req, res) => {
  return res.send(200);
});
app.listen(PORT, () => console.log("Listening to 3001..."));

export default app;
