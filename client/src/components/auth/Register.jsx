import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

const actions = {
  registerUser
};

const mapState = state => ({
  errors: state.errors
});

class Register extends Component {
  state = {
    name: "user",
    password: "123123",
    email: "user@test.com",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors
      });
    }
  }

  handleOnchange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {}
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, password, email } = this.state;
    const autoNumber = Math.ceil(Math.random() * 100);
    const userData = {
      name,
      password,
      email,
      avatar: `https://randomuser.me/api/portraits/men/${autoNumber}.jpg`
    };
    this.props.registerUser(userData, this.props.history);
  };
  render() {
    const { name, password, email, errors } = this.state;
    return (
      <div className="login-page">
        <div className="form">
          <form onSubmit={this.handleSubmit} className="register-form">
            <input
              value={name}
              name="name"
              type="text"
              placeholder="name"
              required
              onChange={this.handleOnchange}
            />
            <input
              value={password}
              name="password"
              type="password"
              placeholder="password"
              required
              onChange={this.handleOnchange}
            />
            <input
              value={email}
              name="email"
              id="myEmail"
              type="email"
              placeholder="email address"
              required
              onChange={this.handleOnchange}
            />
            {errors.email && <p className="errors_email">{errors.email}</p>}

            <button>create</button>
            <p className="message">
              Already registered? <a href="#">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Register);
