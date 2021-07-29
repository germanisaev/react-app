import React from "react";
import axios from "axios";
import "./Login.css";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import jwt from 'jwt-decode';
import { Link } from "react-router-dom";
import authentication from '../Auth/Authentication';

function validate(username, password) {
  // true means invalid, so our conditions got reversed
  return {
    username: username.length === 0, //true if username is empty
    password: password.length === 0, //true if password is empty
  };
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      touched: {
        username: false,
        password: false,
      },
    };
  }


  handleSubmit = (event) => {
    /* if (!this.canBeSubmitted()) {
      event.preventDefault();
      return;
    } */
    event.preventDefault();
    this.AuthUser();
    
    //const { username, password } = this.state;
    //alert(`Signed up with email: ${username} password: ${password}`);
  };
  
  canBeSubmitted() {
    const errors = validate(this.state.username, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleChange = (e) => {
    //debugger;
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUsernameChange = (evt) => {
    this.setState({ username: evt.target.value });
  }
  
  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }
  
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  AuthUser = () => {
    axios
      .post("https://localhost:44372/api/users/authenticate", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((json) => {
        if (json) {
          const user = jwt(json.data.Token);
          authentication.onAuthentication();
          this.GetId(user.given_name,user.family_name);
          this.props.history.push("/home");
        } else {
          alert("Data not Saved");
        }
      });
  };

  GetId = (fname,lname) => {
    axios.get("https://localhost:44372/api/users/"+fname+"/"+lname)
        .then((response) => {
            this.setState({ userId: response.data });
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  render() {

    const errors = validate(this.state.username, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      
      return hasError ? shouldShow : false;
    };

    return (
      <Container className="Login">
        
        <Form onSubmit={this.handleSubmit}>
        <h3>Login Form</h3>
          <FormGroup>
            <Input
              autoFocus
              className={shouldMarkError('username') ? "error" : ""}
              type="text"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleBlur('username')}
            />
            <span className={shouldMarkError('username') ? "error" : "hidden"}>invalid username</span>
          </FormGroup>
          <FormGroup>
            <Input
              className={shouldMarkError('password') ? "error" : ""}
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              onBlur={this.handleBlur('password')}
            />
            <span className={shouldMarkError('password') ? "error" : "hidden"}>invalid password</span>
          </FormGroup>
            
          <Button disabled={isDisabled}>
            Login
          </Button>
        </Form>
        <Link to={"/register"} className="btn btn-link">Registration</Link>
      </Container>
    );
  }
}

export default Login;
