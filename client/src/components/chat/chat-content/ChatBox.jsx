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
  handleSubmit = e => {
    e.preventDefault();
    const { message } = this.state;
    this.props.handleSaveMessage(message);
    this.setState({
      message: ""
    });
  };
  render() {
    return (
      <div className="chat-box bg-white">
        <form className="input-group" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleOnchange}
            name="message"
            value={this.state.message}
            className="form-control border no-shadow no-rounded"
            placeholder="Type your message here"
          />
          <span className="input-group-btn">
            <button className="btn btn-success no-rounded" type="submit">
              Send
            </button>
          </span>
        </form>
        {/* <!-- /input-group -->	 */}
      </div>
    );
  }
}

export default ChatBox;
