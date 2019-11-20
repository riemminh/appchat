import { GET_ERRORS, SET_CURRENT_USER } from "./type";
import axios from "axios";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(user => history.push("/signin"))
    .catch(err => {
      if (err && err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCurrentUser(user));
      history.push("/chat");
    })
    .catch(err => {
      if (err && err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
