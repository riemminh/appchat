import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";

const actions = { loginUser };

const mapState = state => ({
  errors: state.errors,
  auth: state.auth
});

class Login extends Component {
  state = {
    password: "123123",
    email: "user@test.com",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleOnchange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      errors: {}
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const userData = { email, password };
    this.props.loginUser(userData, this.props.history);
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="login-page">
        <div className="form">
          <form onSubmit={this.handleSubmit} className="login-form">
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
            <input
              value={password}
              name="password"
              type="password"
              placeholder="password"
              required
              onChange={this.handleOnchange}
            />

            <button>login</button>
            <p className="message">
              Not registered? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Login);
