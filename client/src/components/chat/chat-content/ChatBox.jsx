import React, { Component } from "react";

class ChatBox extends Component {
  state = {
    message: ""
  };

  handleOnchange = e => {
    this.setState({
      message: e.target.value
    });
  };
  handleSubmit = () => {
    const { roomId } = this.props;
    const { message } = this.state;
    console.log(message);
  };
  render() {
    return (
      <div className="chat-box bg-white">
        <div className="input-group">
          <input
            onChange={this.handleOnchange}
            name="message"
            className="form-control border no-shadow no-rounded"
            placeholder="Type your message here"
          />
          <span className="input-group-btn">
            <button
              onClick={this.handleSubmit}
              className="btn btn-success no-rounded"
              type="button"
            >
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
