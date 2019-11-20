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

export default router;
