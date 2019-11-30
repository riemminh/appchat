import React, { Component } from "react";
import io from "socket.io-client";

class CountUnreadGroups extends Component {
  _isMousted = true;
  _socket = io("http://localhost:5000");

  state = {
    countUnread: 0
  };
  componentDidMount() {
    const { idUserActive, listGroup } = this.props;
    const dataQuery = {
      idUserActive,
      listGroup // id groups
    };
    this._socket.emit("query-count-unread-groups", dataQuery);
    this._socket.on("query-count-unread-groups", countUnread => {
      if (this._isMousted) {
        this.setState({
          ...this.state,
          countUnread: countUnread
        });
      }
    });
  }
  componentDidUpdate(prevPops, prevSatate) {
    const { idUserActive, listGroup, groups } = this.props;
    const dataQuery = {
      idUserActive,
      listGroup // nhan den
    };
    if (prevPops.groups !== groups) {
      this._socket.emit("query-count-unread-groups", dataQuery);
      this._socket.on("query-count-unread-groups", countUnread => {
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

export default CountUnreadGroups;
