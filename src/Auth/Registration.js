import React from 'react';
import axios from "axios";
import "./Login.css";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

function validate(firstname, lastname, username, password) {
    // true means invalid, so our conditions got reversed
    return {
        firstname: firstname.length === 0, //true if firstname is empty
        lastname: lastname.length === 0, //true if lastname is empty
        username: username.length === 0, //true if username is empty
        password: password.length === 0, //true if password is empty
    };
  }

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            touched: {
                firstname: false,
                lastname: false,
                username: false,
                password: false,
          },
        };
      }

      UserRegister = () => {
        axios
          .post("https://localhost:44372/api/users/register", {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
          })
          .then((json) => {
            if (json) {
              this.props.history.push("/Login");
            } else {
              alert("Data not Saved");
            }
          });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        this.UserRegister();
      };

      handleFirstnameChange = (evt) => {
        this.setState({ firstname: evt.target.value });
      }
      
      handleLastnameChange = (evt) => {
        this.setState({ lastname: evt.target.value });
      }

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

render() {

    const errors = validate(this.state.firstname, this.state.lastname, this.state.username, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      
      return hasError ? shouldShow : false;
    };

  return(
    <Container className="Register">
      
    <Form onSubmit={this.handleSubmit}>
    <h3>Registration Form</h3>
    <FormGroup>
        <Input
          autoFocus
          className={shouldMarkError('firstname') ? "error" : ""}
          type="text"
          name="firstname"
          placeholder="Enter firstname"
          value={this.state.firstname}
          onChange={this.handleFirstnameChange}
          onBlur={this.handleBlur('firstname')}
        />
        <span className={shouldMarkError('firstname') ? "error" : "hidden"}>invalid firstname</span>
      </FormGroup>
      <FormGroup>
        <Input
          className={shouldMarkError('lastname') ? "error" : ""}
          type="text"
          name="lastname"
          placeholder="Enter lastname"
          value={this.state.lastname}
          onChange={this.handleLastnameChange}
          onBlur={this.handleBlur('lastname')}
        />
        <span className={shouldMarkError('lastname') ? "error" : "hidden"}>invalid lastname</span>
      </FormGroup>
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
        Registration
      </Button>
    </Form>
    <Link to={"/login"} className="btn btn-link">Cancel</Link>
  </Container>
    )
}
}

export default Registration;