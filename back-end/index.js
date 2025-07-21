require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/users", require("./routes/User"));
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("chat message", (msg) => {
    console.log("message :" + msg);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
connectDB();
mongoose.connection.on("error", (err) => {
  console.log("MongoDB err:" + err);
});
mongoose.connection.once("open", () => {
  console.log("Connect To MongoDb");
  server.listen(3500, () => {
    console.log("running on Port 3500");
  });
});
