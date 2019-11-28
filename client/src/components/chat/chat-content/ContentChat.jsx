import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropType from "prop-types";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import io from "socket.io-client";

const PropTypes = {
  auth: PropType.object,
  chat: PropType.object
};

const actions = {};

const mapState = state => ({
  auth: state.auth,
  chat: state.chat
});
let dataGetMessage;
class ContentChat extends Component {
  _isMousted = true;
  _socket = io("http://localhost:5000");
  state = {
    roomId: "",
    limitMessage: 10,
    currentPage: 1,
    dataMessage: [],
    user_connected: "",
    isUserActive: false
  };

  handleGetroom = () => {
    const { match, auth } = this.props;
    const dataGetroom = {
      idParam: match.params.id,
      idUser: auth.user._id
    };
    this._socket.emit("set-room", dataGetroom);
  };

  componentDidMount() {
    this.handleGetroom();
    // get message

    this._socket.on("set-room", roomId => {
      // console.log(roomId);
      if (this._isMousted) {
        this.setState(
          {
            ...this.state,
            roomId: roomId,
            isUserActive: true
          },
          () => {
            dataGetMessage = {
              roomId: this.state.roomId,
              limitMessage: this.state.limitMessage,
              currentPage: this.state.currentPage,
              idUser: this.props.auth.user._id
            };
            this._socket.emit("get-message-room", dataGetMessage);
          }
        );
      }
    });

    this._socket.on("get-message", () => {
      // console.log("chay-messgae");
      this._socket.emit("get-message-room", dataGetMessage);
    });
    this._socket.on("get-message-room", messages => {
      if (this._isMousted) {
        this.setState({
          dataMessage: messages
        });
      }
    });

    this._socket.on("set-room-bug", () => {
      const { auth } = this.props;
      const idUser = auth.user._id;
      // console.log(idUser);
      this.props.history.push(`/chat/${idUser}`);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { match, auth } = this.props;
    const { dataMessage, isUserActive, roomId } = this.state;
    if (match.params.id !== prevProps.match.params.id) {
      this.handleGetroom();
    }
  }

  componentWillUnmount() {
    this._isMousted = false;
  }

  handleSaveMessage = message => {
    const { auth, match } = this.props;
    const msgFrom = auth.user._id;
    const msgTo = match.params.id;
    const roomId = this.state.roomId;
    const dataMessage = {
      msgFrom,
      msgTo,
      roomId,
      message
    };
    this._socket.emit("save-message", dataMessage);
  };

  render() {
    return (
      <Fragment>
        <ChatMessage
          idUser={this.props.auth.user._id}
          dataMessage={this.state.dataMessage}
        />
        <ChatBox handleSaveMessage={this.handleSaveMessage} />
      </Fragment>
    );
  }
}

export default connect(mapState, actions)(withRouter(ContentChat));
