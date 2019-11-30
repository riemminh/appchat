import UserModel from "../model/User";

// get user

// getListUser
export const getListUser = id => {
  return UserModel.find()
    .then(users => users)
    .catch(err => err);
};

// update user
export const updateUserId = (id, dataUpdate) => {
  return UserModel.findByIdAndUpdate(id, { $set: dataUpdate }, { new: true })
    .then(user => user)
    .catch(err => err);
};
