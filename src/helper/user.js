import UserModel from "../model/User";

// get user
export const getUserId = id => {
  return UserModel.findById(id)
    .then(user => {
      return user;
    })
    .catch(err => console.log(err));
};

// getListUser
export const getListUser = id => {
  return UserModel.find({ _id: { $ne: id } })
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
};

// update user
export const updateUserId = (id, isActive) => {
  return UserModel.findByIdAndUpdate(
    id,
    { $set: { isActive: isActive } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
};
