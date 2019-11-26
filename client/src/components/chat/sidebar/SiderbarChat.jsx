import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { NavLink } from "react-router-dom";
import moment from "moment";
import {} from "../../../actions/chatActions";

const PropTyeps = {
  listsiderbar: PropType.array,
  idUser: PropType.string
};

const actions = {};
class SiderbarChat extends Component {
  render() {
    const { listsiderbar, idUser } = this.props;
    return (
      <Fragment>
        <div className=" row border-bottom padding-sm title_member">Group</div>
        <ul className="friend-list">
          <li>
            <NavLink to={`/chat/123123123`} className="clearfix">
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
            </NavLink>
          </li>
        </ul>
        <div className=" row border-bottom padding-sm title_member">Member</div>
        <ul className="friend-list">
          {listsiderbar.map(user => (
            <Fragment key={user._id}>
              {idUser === user._id ? null : (
                <li className="bounceInDown">
                  <NavLink
                    to={`/chat/${user._id}`}
                    className={user.isOnline ? "clearfix online" : "clearfix"}
                  >
                    <img src={user.avatar} alt="" className="img-circle" />
                    <div className="friend-name">
                      <strong>{user.name}</strong>
                    </div>
                    <div className="last-message text-muted">
                      Hello, Are you there?
                    </div>
                    {user.isOnline ? null : (
                      <small className="time text-muted">
                        {moment(user.lastOnline).fromNow()}
                      </small>
                    )}

                    <small className="chat-alert label label-danger">1</small>
                  </NavLink>
                </li>
              )}
            </Fragment>
          ))}

          {/* <li>
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
          </li> */}
        </ul>
      </Fragment>
    );
  }
}

export default connect(null, actions)(SiderbarChat);