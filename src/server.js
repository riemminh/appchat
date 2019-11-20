import express from "express";
import mongoose from "mongoose";
import http from "http";
import socketIo from "socket.io";
import bodyParser from "body-parser";
import RouterUser from "./routes/api/user";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

    io.on("connection", socket => {});
  })
  .catch(err => console.log(err));
