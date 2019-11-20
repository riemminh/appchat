import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const isLogin = false;

const mapState = state => ({
  auth: state.auth
});

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default connect(mapState, null)(PrivateRoute);
