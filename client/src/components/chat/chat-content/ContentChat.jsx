import React, { Component, Fragment } from "react";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";

class ContentChat extends Component {
  render() {
    return (
      <Fragment>
        <ChatMessage />
        <ChatBox />
      </Fragment>
    );
  }
}

export default ContentChat;
