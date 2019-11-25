import React, { Component } from "react";

class ChatMessage extends Component {
  render() {
    const { dataMessage } = this.props;
    return (
      <div className="chat-message">
        <ul className="chat">
          {dataMessage.length > 0 ? (
            dataMessage.map(chat => (
              <li className="left clearfix">
                <span className="chat-img pull-left">
                  <img
                    src="https://bootdey.com/img/Content/user_3.jpg"
                    alt="User Avatar"
                  />
                </span>
                <div className="chat-body clearfix">
                  <div className="header">
                    <strong className="primary-font">John Doe</strong>
                    <small className="pull-right text-muted">
                      <i className="fa fa-clock-o"></i> 12 mins ago
                    </small>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
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
        </ul>
      </div>
    );
  }
}

export default ChatMessage;
