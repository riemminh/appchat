import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SiderbarChat from "./sidebar/SiderbarChat";
import ContentChat from "./chat-content/ContentChat";
import io from "socket.io-client";
import { clearCurrentUser } from "../../actions/authActions";

const action = { clearCurrentUser };

const mapState = state => ({
  auth: state.auth
});

class Chat extends Component {
  _socket = null;
  _isMousted = true;
  state = {
    endpoint: "http://localhost:5000",
    oldmessage: [],
    listsiderbar: []
  };
  componentDidMount() {
    const { auth } = this.props;
    const { endpoint } = this.state;
    this._socket = io(endpoint);
    this._socket.on("connect", () => {
      this._socket.emit("set-user-data", auth.user);
    });
    this._socket.on("get-all-user-data", users => {
      if (this._isMousted) {
        this.setState({
          ...this.state,
          listsiderbar: users
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMousted = false;
    this._socket.emit("disconnect-user");
  }

  handleLogout = e => {
    localStorage.removeItem("user");
    e.preventDefault();
    this.props.clearCurrentUser();
    this.props.history.push("/signin");
    this._socket.emit("disconnect-user");
  };

  render() {
    const { auth } = this.props;
    return (
      <div className="chat-container">
        <div className="container bootstrap snippet">
          <button
            onClick={this.handleLogout}
            className="btn btn-danger logout-btn"
          >
            Logout
          </button>
          <div className="row">
            <div className="col-md-4 bg-white ">
              {/* <!-- member list --> */}
              <SiderbarChat
                idUser={auth.user._id}
                listsiderbar={this.state.listsiderbar}
              />
            </div>
            {/* <!-- selected chat --> */}
            <div className="col-md-8 bg-white ">
              {auth.user._id === this.props.match.params.id ? (
                <div className="welcome">
                  <h5>Welcome to the chat room</h5>
                </div>
              ) : (
                <ContentChat />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapState, action)(Chat);
