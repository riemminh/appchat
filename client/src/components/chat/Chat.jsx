import React, { Component } from "react";
import SiderbarChat from "./sidebar/SiderbarChat";
import ContentChat from "./chat-content/ContentChat";
class Chat extends Component {
  render() {
    return (
      <div className="chat-container">
        <div className="container bootstrap snippet">
          <div className="row">
            <div className="col-md-4 bg-white ">
              {/* <!-- member list --> */}
              <SiderbarChat />
            </div>
            {/* <!-- selected chat --> */}
            <div className="col-md-8 bg-white ">
              <ContentChat />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Chat;
