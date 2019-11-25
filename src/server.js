import express from "express";
import mongoose from "mongoose";
import http from "http";
import socketIo from "socket.io";
import bodyParser from "body-parser";
import RouterUser from "./routes/api/user";
import RoomModel from "./model/Room";
import MessageModel from "./model/Message";

import { getUserId, getListUser, updateUserId } from "./helper/user";

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
        updateUserId(socket.id_user, { isOnline: true }).then(user => {
          getListUser(socket.id_user).then(users => {
            io.sockets.emit("get-all-user-data", users);
          });
        });
      });
      // ==========start set-room
      const handleCheckTypeRoom = data => {
        let currentRoom, reverseRoom;
        const { idParam, idUser } = data;
        RoomModel.findOne({
          $or: [
            { name1: `${idParam}_${idParam}` },
            { name2: `${idParam}_${idParam}` }
          ]
        }).then(group => {
          if (group) {
            console.log("group");
            // handleSetRoom(group._id);
          } else {
            currentRoom = `${idParam}_${idUser}`;
            reverseRoom = `${idUser}_${idParam}`;
            RoomModel.findOne({
              $or: [
                { name1: currentRoom },
                { name2: reverseRoom },
                { name1: reverseRoom },
                { name2: currentRoom }
              ]
            })
              .then(roomUser => {
                if (roomUser) {
                  handleSetRoom(roomUser._id);
                } else {
                  const newRoom = new RoomModel({
                    name1: currentRoom,
                    name2: reverseRoom
                  });
                  newRoom.save().then(room => {
                    handleSetRoom(room._id);
                  });
                }
              })
              .catch(err => console.log(err));
          }
        });
      };

      const handleSetRoom = roomId => {
        socket.room = roomId;
        console.log("roomId: " + socket.room);
        socket.join(roomId);
        io.to(socket.room).emit("set-room", socket.room);
      };
      socket.on("set-room", data => {
        // console.log(data);
        handleCheckTypeRoom(data);
      });
      // ==========end set-room
      // ==========start get messgae

      socket.on("get-message-room", dataGetMessage => {
        MessageModel.find({ room: dataGetMessage.roomId }).then(messages => {
          if (messages == "" || messages == undefined || messages == null) {
            io.to(dataGetMessage.roomId).emit("get-message-room", []);
          } else {
            io.to(dataGetMessage.roomId).emit("get-message-room", messages);
          }
        });
      });
      // ==========end get messgae
      // disconnect
      const logOutUser = () => {
        updateUserId(socket.id_user, {
          isOnline: false,
          lastOnline: Date.now()
        }).then(() => {
          getListUser(socket.id_user).then(users => {
            io.sockets.emit("get-all-user-data", users);
          });
        });
      };
      socket.on("disconnect", () => {
        logOutUser();
      });
      socket.on("disconnect-user", () => {
        logOutUser();
      });
    });

    // ======= SOCKET.IO ======= //
  })
  .catch(err => console.log(err));
