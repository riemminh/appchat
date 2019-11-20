import React, { Component } from "react";

class ChatBox extends Component {
  render() {
    return (
      <div className="chat-box bg-white">
        <div className="input-group">
          <input
            className="form-control border no-shadow no-rounded"
            placeholder="Type your message here"
          />
          <span className="input-group-btn">
            <button className="btn btn-success no-rounded" type="button">
              Send
            </button>
          </span>
        </div>
        {/* <!-- /input-group -->	 */}
      </div>
    );
  }
}

export default ChatBox;
