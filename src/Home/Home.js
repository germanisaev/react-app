import React, {Component} from "react";
import AddHistory from '../History/AddHistory'
import HistoryList from "../History/HistoryList";
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = { 
            histories: [],
            userId: 0
         };
      }

    handlerData = () => {
        const user = localStorage.getItem('user');
        axios.get("https://localhost:44372/api/history/user/"+user)
            .then((response) => {
                if(this._isMounted) {
                    this.setState({ histories: response.data });
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 
    }

  componentDidMount() {
    this._isMounted = true;
    this.handlerData()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

    addHandler = (b) => {
        this.setState({ histories: b });
    }

    logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }
    
render() {
  return (
      <div className="container">
        <Link to={"/"} className="btn btn-link">Logout</Link>
        <AddHistory histories={this.state.histories} addHandler={this.addHandler}/>
        <HistoryList histories={this.state.histories}/>
      </div>
  );
}
}