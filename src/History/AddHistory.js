import React from "react";
import axios from "axios";
import "./AddHistory.css";
import {
  Container,
  Col,
  Form,
  Row,
  Input,
} from "reactstrap";

class AddHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: '',
      Value1: '',
      Operator: "1",
      Value2: '',
      Result: ''
    };
  }
  CalculateExercise = () => {
    var opr="";
    switch(this.state.Operator) {
      case "1":
        opr = "add";
        break;
      case "2":
        opr = "sub";
        break;
      case "3":
        opr = "mul";
        break;
      case "4":
        opr = "div";
        break;
    }
    const webApi = "https://localhost:44372/api/math/" + opr + "/";
    axios.post(webApi, {
      a: this.state.Value1,
      b: this.state.Value2
    })
    .then((json) => {
      document.getElementById('Result').value = json.data;
      console.log(json.data);
      if (json) {
        this.state.Result = json.data;
        this.AddHistory();
        alert("Data Save Successfully");
      } else {  
        console.log(json.data);
        alert("Data not Saved");
      }
    }, error => {
      console.log(error);
    })
  };
  AddHistory = () => {
    const user = localStorage.getItem('user');
    this.state.UserId = user;
    axios
      .post("https://localhost:44372/api/history", {
        UserId: this.state.UserId,
        Value1: this.state.Value1,
        Operator: this.state.Operator,
        Value2: this.state.Value2,
        Result: this.state.Result,
      })
      .then((json) => {
        
        if (json) {
          const user = localStorage.getItem('user');
          axios.get("https://localhost:44372/api/history/user/"+user)
              .then((response) => {
                this.props.addHandler(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });

          alert("Data Save Successfully");
        } else {
          alert("Data not Saved");
        }
      });
  };

  selectChange = (e) => {
    this.setState({Operator: e.target.value});
  };

  handleChange = (e) => {
    //debugger;
    this.setState({ [e.target.name]: e.target.value });
    //this.CalculateExercise;
  };

  onKeyUpValue(event) {
    //debugger;
    console.log(event.target.value)
  };

  handleKeyPress = (event) => {
    //debugger;
    if(event.key === 'Enter') {
      if(this.state.Value1 !== null && this.state.Value2 !== null) {
        this.CalculateExercise();
        console.log('enter press here! ')
      }
      else {
        alert('Enter value');
      }
    }
  };

  handleKeyDown = (event) => {
    //debugger;
    var code = event.keyCode || event.which;
    if (code === 9) {
      //CalculateExercise();
      e.preventDefault();
      alert("Execute ajax call after tab pressed");
      
      //this.CalculateExercise;
    }
  }

  render() {
    return (
      <Container className="App">
        <h4 className="PageHeading">Exempt exercise</h4>
        <Form className="form">
          <Row>
              <Col sm={2}>
                <Input
                  autoFocus
                  title="Enter Value"
                  type="text"
                  name="Value1"
                  onChange={this.handleChange}
                  value={this.state.Value1}
                />
              </Col>
              <Col sm={2}>
                <Input type="select" name="Operator" title="Choose Operator" value={this.state.Operator} 
                onChange={this.selectChange}>
                    <option value="1">+</option>
                    <option value="2">-</option>
                    <option value="3">*</option>
                    <option value="4">/</option>
                </Input>
              </Col>
            
              <Col sm={2}> 
                <Input
                  type="text"
                  name="Value2"
                  title="Click Enter for Result"
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  value={this.state.Value2}
                />
              </Col>
            
              <Col sm={1}>
                =
              </Col>
            
            <Col sm={2}>
              <Input
                  type="text"
                  name="Result"
                  id="Result"
                  value={this.state.Result}
                  readOnly
                />
            </Col>
            
          </Row>
        </Form>
      </Container>
    );
  }
}

export default AddHistory;


/* <FormGroup row>
              <Label for="address" sm={2}>
                RollNo
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="RollNo"
                  onChange={this.handleChange}
                  value={this.state.RollNo}
                  placeholder="Enter RollNo"
                />
              </Col>
            </FormGroup> */
