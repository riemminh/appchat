import React, { Component } from "react";
import io from "socket.io-client";

class CountUnread extends Component {
  _isMousted = true;
  _socket = io("http://localhost:5000");

  state = {
    countUnread: 0
  };
  componentDidMount() {
    // console.log("123");
    const { idListUser, idUserActive } = this.props;
    const dataQuery = {
      idListUser, // den tu
      idUserActive // nhan den
    };
    this._socket.emit("last-message-unread", dataQuery);
    this._socket.emit("query-count-unread", dataQuery);
    this._socket.on("query-count-unread", countUnread => {
      if (this._isMousted) {
        this.setState({
          ...this.state,
          countUnread: countUnread
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
      this._socket.emit("query-count-unread", dataQuery);
      this._socket.on("query-count-unread", countUnread => {
        if (this._isMousted) {
          this.setState({
            ...this.state,
            countUnread: countUnread
          });
        }
      });
    }
  }
  render() {
    return (
      <div>
        {/* {console.log(`${idListUser}_${idUserActive}`)}{" "} */}
        {this.state.countUnread > 0 && (
          <small className="chat-alert label label-danger">
            {this.state.countUnread}
          </small>
        )}
      </div>
    );
  }
}

export default CountUnread;
