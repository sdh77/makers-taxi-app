const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");
const { Client } = require("pg");
const io = socketIO(server, {
  cors: {
    origin: "*", // 또는 특정 도메인을 명시
  },
});
const client = new Client({
  user: "sanggeukz",
  host: "127.0.0.1",
  database: "tanyang",
  password: "taxi",
  port: 5432,
});

client.connect();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "src")));

// 클라이언트에게 LiModel을 전달
io.on("connection", (socket) => {
  // LiModel 객체를 직접 전송
  socket.emit("getLiModel", {
    name: "default",
    msg: "default",
    time: "default",
  });

  socket.on("chatting", (data) => {
    const { name, msg } = data;
    const formattedTime = moment().format("h:mm A");
    io.emit("chatting", {
      name,
      msg,
      time: formattedTime,
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
