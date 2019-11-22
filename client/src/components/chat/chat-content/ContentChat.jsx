import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import io from "socket.io-client";

const action = {};

const mapState = state => ({
  auth: state.auth
});

class ContentChat extends Component {
  state = {
    endpoint: "http://localhost:5000",
    oldmessage: [],
    listsiderbar: []
  };

  componentDidMount() {
    const { auth } = this.props;
    const { endpoint } = this.state;
    const socket = io(endpoint);
    socket.on("connect", () => {
      socket.emit("set-user-data", auth.user);
    });
  }
  render() {
    return (
      <Fragment>
        <ChatMessage />
        <ChatBox />
      </Fragment>
    );
  }
}

export default connect(mapState, action)(ContentChat);
