import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";

export default class HistoryList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { business: [] };
  // }
  // componentDidMount() {
  //   //debugger;
  //   axios
  //     .get("https://localhost:44372/api/history")
  //     .then((response) => {
  //       this.setState({ business: response.data });
  //       //debugger;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // componentDidUpdate() {
  //   axios
  //   .get("https://localhost:44372/api/history")
  //   .then((response) => {
  //     this.setState({ business: response.data });
  //     //debugger;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }


  tabRow() {
    if(this.props.histories) {
    return this.props.histories.map(function (object, i) {
      return <Table obj={object} key={i}/>;
    });
  }
  }

  render() {
    return (
      <div>
        <h4 align="center">History List</h4>
        <table className="table" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
