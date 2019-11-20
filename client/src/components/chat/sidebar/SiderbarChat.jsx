import React, { Component, Fragment } from "react";

class SiderbarChat extends Component {
  render() {
    return (
      <Fragment>
        <div className=" row border-bottom padding-sm title_member">Member</div>
        <ul className="friend-list">
          <li className="active bounceInDown">
            <a href="#" className="clearfix">
              <img
                src="https://bootdey.com/img/Content/user_1.jpg"
                alt=""
                className="img-circle"
              />
              <div className="friend-name">
                <strong>John Doe</strong>
              </div>
              <div className="last-message text-muted">
                Hello, Are you there?
              </div>
              <small className="time text-muted">Just now</small>
              <small className="chat-alert label label-danger">1</small>
            </a>
          </li>
          <li>
            <a href="#" className="clearfix">
              <img
                src="https://bootdey.com/img/Content/user_2.jpg"
                alt=""
                className="img-circle"
              />
              <div className="friend-name">
                <strong>Jane Doe</strong>
              </div>
              <div className="last-message text-muted">
                Lorem ipsum dolor sit amet.
              </div>
              <small className="time text-muted">5 mins ago</small>
              <small className="chat-alert text-muted">
                <i className="fa fa-check"></i>
              </small>
            </a>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default SiderbarChat;
