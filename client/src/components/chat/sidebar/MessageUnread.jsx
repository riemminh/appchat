import React, { Component } from "react";
import io from "socket.io-client";

class MessageUnread extends Component {
  _isMousted = true;
  _socket = io("http://localhost:5000");

  state = {
    lastMessageUnread: null
  };
  componentDidMount() {
    // console.log("123");
    const { idListUser, idUserActive } = this.props;
    const dataQuery = {
      idListUser, // den tu
      idUserActive // nhan den
    };
    this._socket.emit("last-message-unread", dataQuery);
    this._socket.on("last-message-unread", lastMessageUnread => {
      if (this._isMousted) {
        this.setState({
          ...this.state,
          lastMessageUnread: lastMessageUnread
        });
      }
    });
  }
  componentDidUpdate(prevPops, prevSatate) {
    const { idListUser, idUserActive, listsiderbar } = this.props;
    const dataQuery = {
      idListUser, // den
      idUserActive // nhan
    };
    if (prevPops.listsiderbar !== listsiderbar) {
      this._socket.emit("last-message-unread", dataQuery);
      this._socket.on("last-message-unread", lastMessageUnread => {
        if (this._isMousted) {
          this.setState({
            ...this.state,
            lastMessageUnread: lastMessageUnread
          });
        }
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.lastMessageUnread !== null && (
          <div className="last-message text-muted">
            {this.state.lastMessageUnread.msg}{" "}
          </div>
        )}
      </div>
    );
  }
}

export default MessageUnread;
