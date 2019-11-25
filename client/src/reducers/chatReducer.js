import { SET_TYPE_ROOM_GROUP, SET_TYPE_ROOM_USER } from "../actions/type";

const initialState = {
  typeRoom: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case SET_TYPE_ROOM_GROUP:
      return {
        ...state,
        typeRoom: true
      };
    case SET_TYPE_ROOM_USER:
      return {
        ...state,
        typeRoom: false
      };
    default:
      return state;
  }
}
