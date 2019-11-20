import { SET_CURRENT_USER } from "../actions/type";

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
    default:
      return state;
  }
}
