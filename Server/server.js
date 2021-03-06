import express from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "./passport";
import authRouter from "./Router/authRouter";
import apiRouter from "./Router/apiRouter";
import battleRouter from "./Router/battleRouter";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import "./Bot/discordBot";
import "./db";
import io from "./io";

dotenv.config();

const app = express();
const PORT = 3001;
const httpServer = http.createServer(app);
io(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SIGN));

app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/battle", battleRouter);
app.get("/", (req, res) => {
  return res.send(200);
});

httpServer.listen(PORT, () => console.log("Listening to 3001..."));

export default app;
