import { GET_ERRORS } from "../actions/type";

const initialState = {};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case GET_ERRORS:
      return actions.payload;
    default:
      return state;
  }
}
