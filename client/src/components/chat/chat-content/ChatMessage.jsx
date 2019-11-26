import React, { Component } from "react";
import moment from "moment";

class ChatMessage extends Component {
  _isMousted = true;
  componentWillReceiveProps(nextProps) {
    if (this.props.dataMessage !== nextProps.dataMessage) {
      if (this._isMousted) {
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataMessage !== this.props.dataMessage) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    this._isMousted = false;
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { dataMessage, idUser } = this.props;
    return (
      <div className="chat-message">
        <ul className="chat">
          {dataMessage.length > 0 ? (
            dataMessage.map(chat => (
              <li
                key={chat._id}
                className={
                  idUser === chat.msgTo._id ? "left clearfix" : "right clearfix"
                }
              >
                <span
                  className={
                    idUser === chat.msgTo._id
                      ? "chat-img pull-left"
                      : "chat-img pull-right"
                  }
                >
                  <img src={chat.msgTo.avatar} alt="User Avatar" />
                </span>
                <div className="chat-body clearfix">
                  <div className="header">
                    <strong className="primary-font">{chat.msgTo.name}</strong>
                    <small className="pull-right text-muted">
                      <i className="fa fa-clock-o"></i>{" "}
                      {moment(chat.createdAt).fromNow()}
                    </small>
                  </div>
                  <p>{chat.msg}</p>
                </div>
              </li>
            ))
          ) : (
            <div>Hien chua co tin nhan nao</div>
          )}

          {/* <li className="right clearfix">
            <span className="chat-img pull-right">
              <img
                src="https://bootdey.com/img/Content/user_1.jpg"
                alt="User Avatar"
              />
            </span>
            <div className="chat-body clearfix">
              <div className="header">
                <strong className="primary-font">Sarah</strong>
                <small className="pull-right text-muted">
                  <i className="fa fa-clock-o"></i> 13 mins ago
                </small>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales
                at.
              </p>
            </div>
          </li> */}
          <li>
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            ></div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ChatMessage;
