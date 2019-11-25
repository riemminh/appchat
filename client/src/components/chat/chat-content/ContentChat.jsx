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

class ContentChat extends Component {
  _isMousted = true;
  _socket = io("http://localhost:5000");
  state = {
    roomId: "",
    limitMessage: 5,
    currentPage: 1,
    dataMessage: []
  };
  componentDidMount() {
    this.handleSetRoom();
    this._socket.on("set-room", roomId => {
      if (this._isMousted) {
        this.setState(
          {
            roomId: roomId
          },
          () => {
            const dataGetMessage = {
              roomId: this.state.roomId,
              limitMessage: this.state.limitMessage,
              currentPage: this.state.currentPage
            };
            this._socket.emit("get-message-room", dataGetMessage);
          }
        );
      }
    });
    this._socket.on("get-message-room", dataGetMessage => {
      console.log(dataGetMessage);
      this.setState({
        ...this.state,
        dataMessage: [...dataGetMessage, ...this.state.dataMessage]
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;

    if (prevProps.match.params.id !== match.params.id) {
      this.handleSetRoom();
    }
  }

  componentWillUnmount() {
    this._isMousted = false;
  }

  handleSetRoom = () => {
    const { match, auth } = this.props;
    const idParam = match.params.id;
    const idUser = auth.user._id;
    const data = {
      idParam,
      idUser
    };
    this._socket.emit("set-room", data);
  };

  render() {
    return (
      <Fragment>
        <ChatMessage dataMessage={this.state.dataMessage} />
        <ChatBox />
      </Fragment>
    );
  }
}

export default connect(mapState, actions)(withRouter(ContentChat));
