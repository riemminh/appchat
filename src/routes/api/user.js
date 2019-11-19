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
  UserModel.find({ name: req.body.name }).then(user => {
    if (user.length > 0) {
      return res.json({ name: "da name hay nhap name khac" });
    } else {
      const newUser = new UserModel(req.body);
      newUser.save().then(newuser => {
        res.json(newuser);
      });
    }
  });
});

export default router;
