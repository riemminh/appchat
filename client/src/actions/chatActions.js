import { SET_TYPE_ROOM_GROUP, SET_TYPE_ROOM_USER } from "./type";

export const setTypeRoomGroup = () => dispatch => {
  dispatch({
    type: SET_TYPE_ROOM_GROUP
  });
};

export const setTypeRoomUser = () => dispatch => {
  dispatch({
    type: SET_TYPE_ROOM_USER
  });
};
