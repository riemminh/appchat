import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "../common/PrivateRoute";
import Home from "./home/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Chat from "./chat/Chat";

const mapState = state => ({
  auth: state.auth
});

class Router extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/">
            {auth.isAuthenticated ? (
              <Redirect to={`/chat/${auth.user._id}`} />
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
          <Route path="/signin" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/chat/:id" component={Chat} />
          <PrivateRoute path="/chat" component={Chat} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapState, null)(Router);
