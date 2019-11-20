import { Router } from "express";
import UserModel from "../../model/User";

const router = Router();

// GET @route /api/users/test
// @desc test router
// @access PUBLIC
router.get("/test", (req, res) => {
  res.json({ msg: "router ok" });
});

// GET @route /api/users/create_user
// @desc create user
// @access PUBLIC
router.post("/create_user", (req, res) => {
  UserModel.find({ email: req.body.email }).then(user => {
    if (user.length > 0) {
      return res.json({ name: "email da co vui long nhap email khac" });
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
      if (user.password !== password) {
        res.status(400).json({ password: "khong khop password" });
      } else {
        res.json(user);
      }
    })
    .catch(err => res.status(400).json(err));
});

export default router;
