import express from "express";
import mongoose from "mongoose";
import http from "http";
import socketIo from "socket.io";
import bodyParser from "body-parser";
import RouterUser from "./routes/api/user";
import UserModel from "./model/User";
import RoomModel from "./model/Room";
import MessageModel from "./model/Message";

import { getListUser, updateUserId } from "./helper/user";
import { saveMessage } from "./helper/chat";
import { getListGroups } from "./helper/room";

const app = express();
const server = http.Server(app);
const io = socketIo(server);
// chat
const userRoom = {};
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
        socket.id_user = user._id;
        socket.user_name = user.name;
        console.log(user.name + " :Logged In");

        // hien thi list user sidebar
        updateUserId(socket.id_user, { isOnline: true })
          .then(user => {
            getListGroups()
              .then(groups => {
                io.sockets.emit("get-all-group-data", groups);
              })
              .catch(err => console.log(err));

            getListUser(socket.id_user)
              .then(users => {
                io.sockets.emit("get-all-user-data", users);
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      });
      // ==========start set-room
      // check type rôm add new rôm
      const handleCheckTypeRoom = data => {
        let currentRoom, reverseRoom;
        const { idParam, idUser } = data;
        if (idParam) {
          if (idParam.match(/^[0-9a-fA-F]{24}$/)) {
            RoomModel.findOne({
              $or: [
                { name1: `${idParam}_${idParam}` },
                { name2: `${idParam}_${idParam}` }
              ]
            }).then(group => {
              if (group) {
                handleSetRoom(group._id, group.typeRoom);
              } else {
                currentRoom = `${idParam}_${idUser}`;
                reverseRoom = `${idUser}_${idParam}`;
                UserModel.findById(idParam)
                  .then(user => {
                    if (user) {
                      RoomModel.findOne({
                        $or: [
                          { name1: currentRoom },
                          { name2: reverseRoom },
                          { name1: reverseRoom },
                          { name2: currentRoom }
                        ]
                      }).then(roomUser => {
                        if (roomUser) {
                          handleSetRoom(roomUser);
                        } else {
                          const newRoom = new RoomModel({
                            name1: currentRoom,
                            name2: reverseRoom
                          });
                          newRoom
                            .save()
                            .then(room => {
                              handleSetRoom(room);
                            })
                            .catch(err => console.log(err));
                        }
                      });
                    } else {
                      socket.emit("set-room-bug");
                    }
                  })
                  .catch(err => console.log(err));
              }
            });
          } else {
            socket.emit("set-room-bug");
          }
        } else {
          socket.emit("set-room-bug");
        }
      };

      const handleSetRoom = (room, typeRoom) => {
        if (!typeRoom) typeRoom = false;
        socket.room = room._id;
        socket.join(socket.room);
        // console.log(socket.room + " day la join room id");
        socket.emit("set-room", socket.room, typeRoom);
      };
      socket.on("set-room", data => {
        handleCheckTypeRoom(data);
      });
      // ==========end set-room
      // ==========start get messgae
      socket.on("get-message-room-groups", dataGetMessage => {
        MessageModel.updateMany(
          {
            listUserRead: { $ne: dataGetMessage.idUser },
            room: dataGetMessage.roomId
          },
          { $push: { listUserRead: dataGetMessage.idUser } }
        )
          .then(() => {
            MessageModel.find({
              room: dataGetMessage.roomId
            })
              .sort({ createdAt: -1 })
              .limit(dataGetMessage.limitMessage)
              .skip(
                dataGetMessage.currentPage * (dataGetMessage.currentPage - 1)
              )
              .populate("msgFrom")
              .then(messages => {
                let messagesReverse = messages.sort();
                if (
                  messages == "" ||
                  messages == undefined ||
                  messages == null
                ) {
                  socket.emit("get-message-room-groups", []);
                } else {
                  // console.log(messagesReverse);
                  socket.emit("get-message-room-groups", messagesReverse);
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err => res.status(400).json(err));
      });
      socket.on("get-message-room", dataGetMessage => {
        MessageModel.updateMany(
          {
            $and: [
              { room: dataGetMessage.roomId },
              { msgTo: dataGetMessage.idUser },
              { unreadMessage: false }
            ]
          },
          { $set: { unreadMessage: true } },
          { new: true }
        )
          .then(() => {
            MessageModel.find({ room: dataGetMessage.roomId })
              .sort({ createdAt: -1 })
              .limit(
                dataGetMessage.limitMessage *
                  (dataGetMessage.currentPage - 1) ===
                  0
                  ? 10
                  : dataGetMessage.limitMessage *
                      (dataGetMessage.currentPage - 1)
              )
              .skip(0)
              .populate("msgFrom")
              .then(messages => {
                let messagesReverse = messages.sort();
                if (
                  messages == "" ||
                  messages == undefined ||
                  messages == null
                ) {
                  socket.emit("get-message-room", []);
                } else {
                  // console.log(messagesReverse);
                  socket.emit("get-message-room", messagesReverse);
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      });

      socket.on("save-message", dataMessage => {
        saveMessage(dataMessage)
          .then(() => {
            io.to(socket.room).emit("get-message");
          })
          .catch(err => console.log(err));
      });
      // ==========end get messgae
      // ==========end get messgae unread
      socket.on("get-lai-groups", () => {
        console.log("get-lai-groups");
        getListGroups()
          .then(groups => {
            io.sockets.emit("get-all-group-data", groups);
          })
          .catch(err => console.log(err));
      });
      const getLaiUser = () => {
        getListUser(socket.id_user)
          .then(users => {
            io.sockets.emit("get-all-user-data", users);
          })
          .catch(err => console.log(err));
      };
      socket.on("get-lai-users", () => {
        getLaiUser();
      });
      socket.on("last-message-unread", data => {
        MessageModel.findOne({
          $and: [
            { msgFrom: data.idListUser },
            { msgTo: data.idUserActive },
            { unreadMessage: false }
          ]
        })
          .sort({ createdAt: -1 })
          .then(mes => {
            socket.emit("last-message-unread", mes);
          })
          .catch(err => console.log(err));
      });
      socket.on("query-count-unread-groups", data => {
        // toi cho nay
        MessageModel.find({
          listUserRead: { $ne: data.idUserActive },
          room: data.listGroup
        })
          .countDocuments()
          .then(countUnread => {
            socket.emit("query-count-unread-groups", countUnread);
          })
          .catch(err => console.log(err));
      });
      socket.on("query-count-unread", data => {
        // toi cho nay
        MessageModel.find({
          $and: [
            { msgFrom: data.idListUser },
            { msgTo: data.idUserActive },
            { unreadMessage: false }
          ]
        })
          .countDocuments()
          .then(countUnread => {
            socket.emit("query-count-unread", countUnread);
          })
          .catch(err => console.log(err));
      });
      // ==========end get messgae unread
      // disconnect
      const logOutUser = () => {
        updateUserId(socket.id_user, {
          isOnline: false,
          lastOnline: Date.now()
        }).then(() => {
          getListUser(socket.id_user).then(users => {
            io.emit("get-all-user-data", users);
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
