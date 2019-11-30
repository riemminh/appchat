import RoomModel from "../model/Room";

export const getListGroups = () => {
  return RoomModel.find({ typeRoom: true })
    .then(groups => {
      return groups;
    })
    .catch(err => console.log(err));
};
