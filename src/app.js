// app.js
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

io.on("connection", (socket) => {
  socket.emit("getLiModel", {
    name: "default",
    msg: "default",
    time: "default",
  });

  socket.on("chatting", async (data) => {
    const { name, msg, chatId } = data;
    const formattedTime = moment().format("h:mm A");

    try {
      const query = {
        text: "INSERT INTO chats (name, msg, chatid) VALUES ($1, $2, $3) RETURNING *",
        values: [name, msg, chatId],
      };

      const result = await client.query(query);
      const insertedChat = result.rows[0];

      io.emit("chatting", {
        name: insertedChat.name,
        msg: insertedChat.msg,
        time: insertedChat.time,
        chatId: chatId, // chatid 추가
      });
    } catch (error) {
      console.error("Error inserting chat into database:", error.message);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
