import { Router } from "express";
import UserModel from "../../model/User";
import RoomModel from "../../model/Room";
import MessageModel from "../../model/Message";

const router = Router();

router.post("/get_message", (req, res) => {
  const { dataGetMessage } = req.body;
  // res.json(dataGetMessage);
  // console.log(dataGetMessage);
  MessageModel.find({ room: dataGetMessage.roomId })
    .sort({ createdAt: -1 })
    .limit(dataGetMessage.limitMessage)
    .skip(dataGetMessage.limitMessage * (dataGetMessage.currentPage - 1))
    .populate("msgFrom")
    .then(messages => {
      let messagesReverse = messages.sort();
      if (messages == "" || messages == undefined || messages == null) {
        res.json([]);
      } else {
        // console.log(messagesReverse);
        res.json(messagesReverse);
      }
    })
    .catch(err => console.log(err));
});

router.get("/wow", (req, res) => {
  MessageModel.find({
    listUserRead: { $ne: "5dd8abc3ffd7103014c7df4a" },
    room: "5de207b4d13bed350c2cd584"
  })
    .countDocuments()
    .then(countOk => res.json(countOk))
    .catch(err => res.status(400).json(err));
});

router.post("/update_messgae_groups", (req, res) => {
  MessageModel.updateMany(
    { listUserRead: { $ne: "5dd8abc3ffd7103014c7df4a" } },
    { $push: { listUserRead: "3" } }
  )
    .then(ok => res.json(ok))
    .catch(err => res.status(400).json(err));
});

// GET @route /api/users/test
// @desc test router
// @access PUBLIC
router.get("/test", (req, res) => {
  res.json({ msg: "router ok" });
});

// GET @route /api/users/create_user
// @desc create user
// @access PUBLIC
router.post("/register", (req, res) => {
  UserModel.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ email: "email da co vui long nhap email khac" });
    } else {
      const newUser = new UserModel(req.body);
      newUser.save().then(newuser => {
        res.json(newuser);
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password !== password) {
          res.status(400).json({ password: "khong khop password" });
        } else {
          res.json(user);
        }
      } else {
        res.status(400).json({ email: "email khong ton tai" });
      }
    })
    .catch(err => res.status(400).json(err));
});

router.post("/update_user", (req, res) => {
  UserModel.findByIdAndUpdate(
    "5dd50d5185949b24755e6a61",
    { $set: { isActive: true } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

router.get("/get_list_users", (req, res) => {
  UserModel.find({ _id: { $ne: "5dd50d5185949b24755e6a61" } })
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
});

router.post("/create_group", (req, res) => {
  if (req.body.nameGroup !== "") {
    const newRoomGroup = new RoomModel({
      nameGroup: req.body.nameGroup
    });
    RoomModel.findOne({ nameGroup: req.body.nameGroup })
      .then(co => {
        if (co) {
          return res
            .status(400)
            .json("ten group bi trung vui long thay doi ten");
        } else {
          newRoomGroup
            .save()
            .then(group1 => {
              group1.name1 = `${group1._id}_${group1._id}`;
              group1.name2 = `${group1._id}_${group1._id}`;
              group1.typeRoom = true;

              group1.save().then(newg => {
                res.json(newg);
              });
            })
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(400).json(err));
  } else {
    res.status(400).json("khong duoc de trong name group");
  }
});

export default router;
