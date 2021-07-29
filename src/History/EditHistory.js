import React from "react";
import {
  Container,
  Col,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
import "./AddHistory.css";
class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeValue1 = this.onChangeValue1.bind(this);
    this.onChangeOperator = this.onChangeOperator.bind(this);
    this.onChangeValue2 = this.onChangeValue2.bind(this);
    this.onChangeResult = this.onChangeResult.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        UserId: "",
        Value1: "",
        Operator: "",
        Value2: "",
        Result: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://localhost:44372/api/history/" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
            UserId: response.data.UserId,
            Value1: response.data.Value1,
            Operator: response.data.Operator,
            Value2: response.data.Value2,
            Result: response.data.Result,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeValue1(e) {
    this.setState({
      Value1: e.target.value,
    });
  }
  onChangeOperator(e) {
    this.setState({
      Operator: e.target.value,
    });
  }
  onChangeValue2(e) {
    this.setState({
      Value2: e.target.value,
    });
  }
  onChangeResult(e) {
    this.setState({
      Result: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      Id: this.props.match.params.id,
      UserId: this.state.UserId,
      Value1: this.state.Value1,
      Operator: this.state.Operator,
      Value2: this.state.Value2,
      Result: this.state.Result,
    };
    axios.put("https://localhost:44372/api/history/"+this.props.match.params.id, obj)
      .then((res) => console.log(res.data));
    this.props.history.push("/home");
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
        alert("Data Save Successfully");
        
      } else {  
        console.log(json.data);
        alert("Data not Saved");
      }
    }, error => {
      console.log(error);
    })
  };

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      if(this.state.Value1.length > 0 && this.state.Value2.length > 0) {
        this.CalculateExercise();
        console.log('enter press here! ')
      }
      else {
        alert('Enter value');
      }
    }
  };

  render() {
    return (
      <Container className="UpdateForm">
        <Form className="form" onSubmit={this.onSubmit}>
        <h4 className="PageHeading">Update History</h4>
          <Col>
            <FormGroup>
              <Label for="Value1">
              Value1
              </Label>
              <Col>
                <Input
                  type="text"
                  name="Value1"
                  value={this.state.Value1}
                  onChange={this.onChangeValue1}
                  placeholder="Enter Value1"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Password">
              Operator
              </Label>
              <Col>
              <Input type="select" name="Operator" title="Choose Operator" value={this.state.Operator} 
                onChange={this.onChangeOperator}>
                    <option value="1">+</option>
                    <option value="2">-</option>
                    <option value="3">*</option>
                    <option value="4">/</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Password">
              Value2
              </Label>
              <Col>
              <Input
                  type="text"
                  name="Value2"
                  title="Click Enter for Result"
                  onChange={this.onChangeValue2}
                  value={this.state.Value2}
                  onKeyPress={this.handleKeyPress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Password">
              Result
              </Label>
              <Col>
                <Input
                  type="text"
                  name="Result"
                  id="Result"
                  value={this.state.Result}
                  readOnly
                />
              </Col>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup row>
              <Col sm={6}>
                <Button type="submit" color="success">
                  Submit
                </Button>{" "}
              </Col>
              <Col sm={6}>
                <Button color="danger">Cancel</Button>{" "}
              </Col>
            </FormGroup>
          </Col>
        </Form>
      </Container>
    );
  }
}

export default Edit;

