const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");
const { Pool } = require("pg");

const io = socketIO(server, {
  cors: {
    origin: "*", // 또는 특정 도메인을 명시
  },
});

const pool = new Pool({
  user: "sanggeukz",
  host: "127.0.0.1",
  database: "tanyang",
  password: "taxi",
  port: 5432,
});

io.on("connection", (socket) => {
  socket.on("enterRoom", (chatId) => {
    socket.join(chatId);
    socket.emit("getLiModel", {
      name: "default",
      msg: "default",
      time: "default",
      chatId: chatId,
    });
  });

  socket.on("chatting", async (data) => {
    // socket.on("enterRoom", async (chatId) => {
    // socket.join(chatId);
    try {
      const { name, msg, chatId } = data;
      const formattedTime = moment().format("h:mm A");

      const result = await pool.query(
        "INSERT INTO chats (id, msg, chatid) VALUES ($1, $2, $3) RETURNING *",
        [name, msg, chatId]
      );
      const insertedChat = result.rows[0];

      if (!insertedChat) {
        console.error("Error: No chat inserted into the database");
        return;
      }

      io.to(chatId).emit("chatting", {
        name: insertedChat.id,
        msg: insertedChat.msg,
        time: formattedTime,
        chatId: chatId,
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
