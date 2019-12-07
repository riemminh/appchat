import React, { Component } from "react";
import moment from "moment";

class ChatMessage extends Component {
  _isMousted = true;
  _isScroll = true;

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataMessage !== this.props.dataMessage) {
      if (this._isScroll) {
        this.scrollToBottom();
      }
    }
  }
  componentWillUnmount() {
    this._isMousted = false;
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  handleIsSrcollTrue = () => {
    this._isScroll = true;
  };
  scrollXuogMotTi = () => {
    const { chatref } = this.refs;
    chatref.scrollTop += 150;
    this._isScroll = true;
  };
  handleScroll = e => {
    let element = e.target;

    // console.log(element.scrollHeight + " scrollHeight");
    // console.log(element.scrollTop + " scrollTop");
    // console.log(element.clientHeight + " clientHeight");
    if (element.scrollTop === 0) {
      if (this.props.endmore === true) {
        this._isScroll = false;
        this.props.handleGetLoadMoreMessage(
          this.scrollXuogMotTi,
          this.handleIsSrcollTrue
        );
      } else {
        console.log("chay dien scroll");
      }
    }
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // do something at end of scroll
      //  cai nay la phat hien ket thuc cuon div
    }
  };
  render() {
    const { dataMessage, idUser, endmore } = this.props;
    return (
      <div className="chat-message">
        <ul ref="chatref" onScroll={this.handleScroll} className="chat">
          {console.log(endmore)}
          {endmore === false && dataMessage.length > 0 && (
            <li>
              <div ref="reftop">Khong con tin nhan nao nua</div>
            </li>
          )}

          {dataMessage.length > 0 ? (
            dataMessage.map(chat => (
              <li
                key={chat._id}
                className={
                  idUser === chat.msgFrom._id
                    ? "left clearfix"
                    : "right clearfix"
                }
              >
                <span
                  className={
                    idUser === chat.msgFrom._id
                      ? "chat-img pull-left"
                      : "chat-img pull-right"
                  }
                >
                  <img src={chat.msgFrom.avatar} alt="User Avatar" />
                </span>
                <div className="chat-body clearfix">
                  <div className="header">
                    <strong className="primary-font">
                      {chat.msgFrom.name}
                    </strong>
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
