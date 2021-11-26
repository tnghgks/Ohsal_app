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
import SocketIO from "socket.io";
import "./Bot/discordBot";
import "./db";

dotenv.config();

const app = express();
const PORT = 3001;
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
wsServer.on("connection", (socket) => {
  const userCountChange = (room) => {
    try {
      const userArr = [];
      const users = wsServer.sockets.adapter.rooms.get(room);
      if (users) {
        users.forEach((value) => {
          userArr.push(wsServer.sockets.sockets.get(value).nickname);
        });
        wsServer.to(room).emit("getUsers", userArr);
      }
    } catch (error) {
      console.log(error);
    }
  };
  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
  socket.on("teamShuffle", ({ room, teamNumber }) => {
    try {
      let userArr = [];
      let users = wsServer.sockets.adapter.rooms.get(room);
      if (users) {
        users.forEach((value) => {
          // userArr.push(wsServer.sockets.sockets.get(value).nickname);
        });
        userArr = [
          "호수앱",
          "현진앱",
          "지수앱",
          "윤석앱",
          "인수앱",
          "승만앱",
          "지훈앱",
          "영민앱",
          "성민앱",
          "인엽앱",
        ];
        userArr.sort(() => Math.random() - 0.5);
        wsServer.to(room).emit("teamShuffle", userArr, teamNumber);
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("join", ({ room, username }) => {
    socket.join(room);
    userCountChange(room);
    const text = `${username} 님이 입장하셨습니다.`;
    wsServer.to(room).emit("message", { room, username: "System", text });
  });

  socket.on("leave", ({ room, username }) => {
    socket.leave(room);
    userCountChange(room);
    const text = `${username}님이 퇴장하셨습니다.`;
    wsServer.to(room).emit("message", { room, username: "System", text });
  });

  socket.on("message", ({ room, username, text }) => {
    wsServer.to(room).emit("message", { room, username, text });
  });
});

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
