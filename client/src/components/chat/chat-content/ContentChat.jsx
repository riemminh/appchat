import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropType from "prop-types";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import io from "socket.io-client";
import axios from "axios";

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
    typeRoom: false,
    limitMessage: 10,
    currentPage: 1,
    dataMessage: [],
    user_connected: "",
    isUserActive: false,
    endmore: true
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
    this._socket.on("set-room", (roomId, typeRoom) => {
      // console.log(typeRoom);
      // console.log(roomId);
      if (this._isMousted) {
        this.setState(
          {
            ...this.state,
            roomId: roomId,
            isUserActive: true,
            typeRoom: typeRoom,
            currentPage: 1,
            limitMessage: 10,
            endmore: true
          },
          () => {
            dataGetMessage = {
              roomId: this.state.roomId,
              limitMessage: this.state.limitMessage,
              currentPage: this.state.currentPage,
              idUser: this.props.auth.user._id
            };
            if (this.state.typeRoom) {
              this._socket.emit("get-message-room-groups", dataGetMessage);
            } else {
              this._socket.emit("get-message-room", dataGetMessage);
            }
          }
        );
      }
    });

    this._socket.on("get-message", () => {
      // console.log("chay-messgae");
      const { typeRoom } = this.state;
      this.setState(
        {
          ...this.state,
          currentPage: 1,
          limitMessage: 10,
          endmore: true
        },
        () => {
          dataGetMessage.currentPage = this.state.currentPage;
          dataGetMessage.limitMessage = this.state.limitMessage;
          if (typeRoom) {
            this._socket.emit("get-message-room-groups", dataGetMessage);
          } else {
            this._socket.emit("get-message-room", dataGetMessage);
          }
        }
      );
    });
    this._socket.on("get-message-room-groups", messages => {
      this._socket.emit("get-lai-groups");
      const funSortDate = messages.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      let newReverse = [...funSortDate].reverse();
      if (this._isMousted) {
        this.setState({
          ...this.state,
          dataMessage: newReverse
        });
      }
    });
    this._socket.on("get-message-room", messages => {
      // console.log(messages);

      let newArrayFilterTrue = messages.filter(
        item => item.unreadMessage === true
      );
      let newArrayFilterFalse = messages.filter(
        item => item.unreadMessage === false
      );
      let resultOke = [...newArrayFilterTrue, ...newArrayFilterFalse];
      this._socket.emit("get-lai-users");
      if (this._isMousted) {
        this.setState({
          ...this.state,
          dataMessage: resultOke
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
      this.setState({
        ...this.state,
        endmore: true
      });
    }
    if (dataMessage !== prevProps.dataMessage) {
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
    const typeRoom = this.state.typeRoom;
    const idUserActive = auth.user._id;
    const dataMessage = {
      msgFrom,
      msgTo,
      roomId,
      message,
      typeRoom,
      idUserActive
    };
    this._socket.emit("save-message", dataMessage);
  };

  handleGetLoadMoreMessage = (scrollXuogMotTi, handleIsSrcollTrue) => {
    this.setState(
      {
        ...this.state,
        currentPage: this.state.currentPage + 1
      },
      () => {
        dataGetMessage.currentPage = this.state.currentPage;
        axios
          .post("/api/users/get_message", { dataGetMessage })
          .then(res => {
            console.log(res.data);
            const dataMore = res.data;
            const newdataMessage = [...dataMore, ...this.state.dataMessage];
            if (dataMore.length > 0) {
              this.setState(
                {
                  ...this.state,
                  dataMessage: newdataMessage,
                  endmore: true
                },
                () => {
                  scrollXuogMotTi();
                }
              );
            } else {
              this.setState(
                {
                  ...this.state,
                  endmore: false
                },
                () => {
                  handleIsSrcollTrue();
                }
              );
            }
          })
          .catch(err => console.log(err));
      }
    );
  };

  render() {
    return (
      <Fragment>
        <ChatMessage
          idUser={this.props.auth.user._id}
          dataMessage={this.state.dataMessage}
          handleGetLoadMoreMessage={this.handleGetLoadMoreMessage}
          endmore={this.state.endmore}
        />
        <ChatBox handleSaveMessage={this.handleSaveMessage} />
      </Fragment>
    );
  }
}

export default connect(mapState, actions)(withRouter(ContentChat));
