import express from "express";
import mongoose from "mongoose";
import http from "http";
import socketIo from "socket.io";
import bodyParser from "body-parser";
import RouterUser from "./routes/api/user";
import { getUserId, getListUser } from "./helper/user";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// chat
const userIdOnline = [];
let oldChats, sendUserStack, setRoom;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", RouterUser);
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/appchat", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });

    // ======= SOCKET.IO ======= //

    io.on("connection", socket => {
      // console.log("New client connected");

      // set-user-data
      socket.on("set-user-data", user => {
        console.log(user.name + " :Logged In");

        // luu tru id online
        socket.id_user = user._id;
        userIdOnline.push(user._id);

        // emit-get-all-user
        io.emit("get-all-users");
      });

      // bug cho nay
      socket.on("get-all-users", () => {
        console.log("123");
        getListUser(socket.id_user).then(users => console.log(users));
      });
      // on-get-all-user

      // disconnect
      socket.on("disconnect", () => {
        // console.log("Client disconnected");
      });
    });

    // ======= SOCKET.IO ======= //
  })
  .catch(err => console.log(err));
