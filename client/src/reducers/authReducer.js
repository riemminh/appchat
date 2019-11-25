import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../actions/type";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: actions.payload
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        user: actions.payload,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
